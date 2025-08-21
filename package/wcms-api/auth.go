package main

import (
	"context"
	"crypto/rsa"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/golang-jwt/jwt/v5"
)

type AuthConfig struct {
	Provider   string
	JWKSUrl    string
	Issuer     string
	Audience   string
	EnableAuth bool
}

type AuthMiddleware struct {
	config AuthConfig
	keys   map[string]*rsa.PublicKey
}

type JWKSResponse struct {
	Keys []JWK `json:"keys"`
}

type JWK struct {
	Kid string `json:"kid"`
	Kty string `json:"kty"`
	Use string `json:"use"`
	N   string `json:"n"`
	E   string `json:"e"`
}

type UserClaims struct {
	Sub      string `json:"sub"`
	Email    string `json:"email"`
	Username string `json:"cognito:username"`
	Groups   []string `json:"cognito:groups"`
	jwt.RegisteredClaims
}

func LoadAuthConfig() AuthConfig {
	enableAuth := os.Getenv("AUTH_ENABLED") == "true"
	return AuthConfig{
		Provider:   os.Getenv("AUTH_PROVIDER"),
		JWKSUrl:    os.Getenv("AUTH_JWKS_URL"),
		Issuer:     os.Getenv("AUTH_ISSUER"),
		Audience:   os.Getenv("AUTH_AUDIENCE"),
		EnableAuth: enableAuth,
	}
}

func NewAuthMiddleware(config AuthConfig) *AuthMiddleware {
	return &AuthMiddleware{
		config: config,
		keys:   make(map[string]*rsa.PublicKey),
	}
}

func (a *AuthMiddleware) ValidateJWT(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Skip auth if disabled
		if !a.config.EnableAuth {
			next.ServeHTTP(w, r)
			return
		}

		token := a.extractToken(r)
		if token == "" {
			http.Error(w, "Authorization token required", 401)
			return
		}

		claims, err := a.validateToken(token)
		if err != nil {
			http.Error(w, fmt.Sprintf("Invalid token: %v", err), 401)
			return
		}

		// Add user context to request
		ctx := context.WithValue(r.Context(), "user", claims)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func (a *AuthMiddleware) extractToken(r *http.Request) string {
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		return ""
	}

	parts := strings.Split(authHeader, " ")
	if len(parts) != 2 || parts[0] != "Bearer" {
		return ""
	}

	return parts[1]
}

func (a *AuthMiddleware) validateToken(tokenString string) (*UserClaims, error) {
	token, err := jwt.ParseWithClaims(tokenString, &UserClaims{}, func(token *jwt.Token) (interface{}, error) {
		// Validate the signing method
		if _, ok := token.Method.(*jwt.SigningMethodRSA); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		// Get the key ID from token header
		kid, ok := token.Header["kid"].(string)
		if !ok {
			return nil, fmt.Errorf("kid not found in token header")
		}

		// Get the public key for this kid
		key, err := a.getPublicKey(kid)
		if err != nil {
			return nil, err
		}

		return key, nil
	})

	if err != nil {
		return nil, err
	}

	claims, ok := token.Claims.(*UserClaims)
	if !ok || !token.Valid {
		return nil, fmt.Errorf("invalid token claims")
	}

	// Validate issuer and audience
	if claims.Issuer != a.config.Issuer {
		return nil, fmt.Errorf("invalid issuer")
	}

	if claims.Audience[0] != a.config.Audience {
		return nil, fmt.Errorf("invalid audience")
	}

	return claims, nil
}

func (a *AuthMiddleware) getPublicKey(kid string) (*rsa.PublicKey, error) {
	// Check if we already have this key cached
	if key, exists := a.keys[kid]; exists {
		return key, nil
	}

	// Fetch JWKS if we don't have the key
	err := a.fetchJWKS()
	if err != nil {
		return nil, err
	}

	// Try again after fetching
	if key, exists := a.keys[kid]; exists {
		return key, nil
	}

	return nil, fmt.Errorf("key with kid %s not found", kid)
}

func (a *AuthMiddleware) fetchJWKS() error {
	resp, err := http.Get(a.config.JWKSUrl)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	var jwks JWKSResponse
	if err := json.NewDecoder(resp.Body).Decode(&jwks); err != nil {
		return err
	}

	// Convert JWKs to RSA public keys
	for _, jwk := range jwks.Keys {
		if jwk.Kty == "RSA" && jwk.Use == "sig" {
			key, err := a.jwkToRSAPublicKey(jwk)
			if err != nil {
				continue // Skip invalid keys
			}
			a.keys[jwk.Kid] = key
		}
	}

	return nil
}

func (a *AuthMiddleware) jwkToRSAPublicKey(jwk JWK) (*rsa.PublicKey, error) {
	// NOTE: This is a placeholder implementation
	// For production use, install: go get github.com/lestrrat-go/jwx/v2/jwk
	// Then use: key, err := jwk.ParseKey([]byte(jwkJson))

	// For now, return an error to indicate this needs proper implementation
	return nil, fmt.Errorf("JWK parsing requires proper library - install github.com/lestrrat-go/jwx/v2/jwk for production")
}

// Helper function to get user from context
func GetUserFromContext(ctx context.Context) (*UserClaims, bool) {
	user, ok := ctx.Value("user").(*UserClaims)
	return user, ok
}

// Helper function to check if user has required role
func HasRole(ctx context.Context, requiredRole string) bool {
	user, ok := GetUserFromContext(ctx)
	if !ok {
		return false
	}

	for _, group := range user.Groups {
		if group == requiredRole {
			return true
		}
	}
	return false
}
