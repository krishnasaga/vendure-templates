
package main

import (
	"encoding/json"
	"log"
	"net/http"
)

func handleHealth(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	response := map[string]interface{}{
		"status":  "healthy",
		"service": "wcms-api",
		"auth":    LoadAuthConfig().EnableAuth,
	}
	json.NewEncoder(w).Encode(response)
}


func main() {
	LoadEnv()
	InitMongo()
	defer mongoClient.Disconnect(nil)

	// Initialize authentication
	authConfig := LoadAuthConfig()
	authMiddleware := NewAuthMiddleware(authConfig)

	// Public endpoints
	http.HandleFunc("/health", handleHealth)

	// Protected endpoints - apply authentication middleware
	http.Handle("/pages/", authMiddleware.ValidateJWT(http.HandlerFunc(handlePages)))
	http.Handle("/pages", authMiddleware.ValidateJWT(http.HandlerFunc(handlePages)))
	http.Handle("/components/", authMiddleware.ValidateJWT(http.HandlerFunc(handleComponents)))
	http.Handle("/components", authMiddleware.ValidateJWT(http.HandlerFunc(handleComponents)))

	if authConfig.EnableAuth {
		log.Printf("🔐 Authentication enabled with provider: %s", authConfig.Provider)
	} else {
		log.Println("⚠️  Authentication disabled - all endpoints are public")
	}

	log.Println("🚀 REST API listening on http://localhost:8080/")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
