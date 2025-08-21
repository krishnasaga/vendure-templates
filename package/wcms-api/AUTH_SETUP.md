# Authentication Setup Guide

## AWS Cognito Setup

### 1. Create Cognito User Pool
```bash
# Replace with your actual values
USER_POOL_ID="us-east-1_XXXXXXXXX"
CLIENT_ID="your-app-client-id"
REGION="us-east-1"
```

### 2. Update .env file
```env
AUTH_ENABLED=true
AUTH_PROVIDER=cognito
AUTH_JWKS_URL=https://cognito-idp.us-east-1.amazonaws.com/us-east-1_XXXXXXXXX/.well-known/jwks.json
AUTH_ISSUER=https://cognito-idp.us-east-1.amazonaws.com/us-east-1_XXXXXXXXX
AUTH_AUDIENCE=your-app-client-id
```

### 3. User Groups (Optional)
Create groups in Cognito User Pool:
- `admin` - Full access to all endpoints
- `editor` - Can edit pages and components
- `viewer` - Read-only access

### 4. Frontend Integration
```javascript
// Example using AWS Amplify
import { Auth } from 'aws-amplify';

// Get JWT token
const user = await Auth.currentAuthenticatedUser();
const token = user.signInUserSession.idToken.jwtToken;

// Use in API calls
fetch('http://localhost:8084/pages/', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

## Alternative Providers

### Auth0
```env
AUTH_ENABLED=true
AUTH_PROVIDER=auth0
AUTH_JWKS_URL=https://your-domain.auth0.com/.well-known/jwks.json
AUTH_ISSUER=https://your-domain.auth0.com/
AUTH_AUDIENCE=your-api-identifier
```

### Firebase
```env
AUTH_ENABLED=true
AUTH_PROVIDER=firebase
AUTH_JWKS_URL=https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com
AUTH_ISSUER=https://securetoken.google.com/your-project-id
AUTH_AUDIENCE=your-project-id
```

## Production Setup

### 1. Install proper JWK library
```bash
go get github.com/lestrrat-go/jwx/v2/jwk
go get github.com/lestrrat-go/jwx/v2/jwt
```

### 2. Update auth.go to use proper JWK parsing
Replace the `jwkToRSAPublicKey` function with proper library implementation.

## Testing

### 1. Disable auth for testing
```env
AUTH_ENABLED=false
```

### 2. Test with valid JWT
```bash
# Get token from your auth provider
TOKEN="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."

# Test protected endpoint
curl -H "Authorization: Bearer $TOKEN" \
     http://localhost:8084/pages/
```

## Security Notes

1. **HTTPS Required**: Always use HTTPS in production
2. **Token Expiration**: Implement proper token refresh
3. **Rate Limiting**: Add rate limiting to prevent abuse
4. **Audit Logging**: All edit operations are logged
5. **Role-Based Access**: Customize roles based on your needs
