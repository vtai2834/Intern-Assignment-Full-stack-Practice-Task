# 📡 API Documentation

Documentation đầy đủ cho tất cả API endpoints.

## Base URL

```
http://localhost:5000/api
```

## Authentication

Hầu hết các protected endpoints yêu cầu JWT access token trong header:

```
Authorization: Bearer <access_token>
```

---

## 🔐 Authentication Endpoints

### POST /auth/signup

Đăng ký user mới.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Validation:**
- `name`: required, min 2 characters, max 100 characters
- `email`: required, valid email format
- `password`: required, min 6 characters

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Email already registered"
}
```

**Error Response (400 - Validation):**
```json
{
  "success": false,
  "errors": [
    {
      "msg": "Please provide a valid email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

---

### POST /auth/login

Đăng nhập và nhận tokens.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Cookies Set:**
- `refreshToken`: HttpOnly cookie, expires in 7 days

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

### POST /auth/refresh

Refresh access token bằng refresh token.

**Cookies Required:**
- `refreshToken`: HttpOnly cookie từ login

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Refresh token not found"
}
```

---

### POST /auth/logout

Đăng xuất và xóa refresh token.

**Cookies Required:**
- `refreshToken`: HttpOnly cookie

**Success Response (200):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

**Cookies Cleared:**
- `refreshToken`

---

## 👤 User Endpoints

### GET /users/me

Lấy thông tin user hiện tại. **Protected route**.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "No token provided"
}
```

**Error Response (401 - Token Expired):**
```json
{
  "success": false,
  "message": "Token expired"
}
```

---

### PUT /users/me

Cập nhật thông tin user hiện tại. **Protected route**.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "name": "John Updated",
  "email": "johnupdated@example.com"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "user": {
      "id": 1,
      "name": "John Updated",
      "email": "johnupdated@example.com",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T10:00:00.000Z"
    }
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Email already in use"
}
```

---

## 🏥 Health Check

### GET /health

Kiểm tra trạng thái server.

**Success Response (200):**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

---

## 🔑 JWT Tokens

### Access Token

- **Expiry**: 15 minutes (configurable)
- **Storage**: Client-side (localStorage/memory)
- **Usage**: Sent in Authorization header
- **Payload**:
```json
{
  "id": 1,
  "email": "john@example.com",
  "iat": 1234567890,
  "exp": 1234568790
}
```

### Refresh Token

- **Expiry**: 7 days (configurable)
- **Storage**: 
  - Redis (server-side)
  - HttpOnly cookie (client-side)
- **Usage**: Auto-sent in cookies
- **Payload**:
```json
{
  "id": 1,
  "iat": 1234567890,
  "exp": 1234567890
}
```

---

## ⚠️ Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (auth required) |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## 📝 Error Response Format

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description here"
}
```

Validation errors include an `errors` array:

```json
{
  "success": false,
  "errors": [
    {
      "msg": "Error message",
      "param": "field_name",
      "location": "body"
    }
  ]
}
```

---

## 🧪 Testing with cURL

### Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get Profile (with token)
```bash
curl -X GET http://localhost:5000/api/users/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
```

### Refresh Token
```bash
curl -X POST http://localhost:5000/api/auth/refresh \
  -b cookies.txt
```

### Logout
```bash
curl -X POST http://localhost:5000/api/auth/logout \
  -b cookies.txt
```

---

## 🧪 Testing with Postman

### Environment Variables

Create environment với variables:
- `base_url`: `http://localhost:5000/api`
- `access_token`: (sẽ tự động set sau login)

### Collection Setup

1. **Signup Request**
   - Method: POST
   - URL: `{{base_url}}/auth/signup`
   - Body (JSON):
   ```json
   {
     "name": "{{$randomFullName}}",
     "email": "{{$randomEmail}}",
     "password": "password123"
   }
   ```

2. **Login Request**
   - Method: POST
   - URL: `{{base_url}}/auth/login`
   - Body (JSON):
   ```json
   {
     "email": "test@example.com",
     "password": "password123"
   }
   ```
   - Tests (để auto save token):
   ```javascript
   const response = pm.response.json();
   if (response.success) {
     pm.environment.set("access_token", response.data.accessToken);
   }
   ```

3. **Get Profile Request**
   - Method: GET
   - URL: `{{base_url}}/users/me`
   - Headers:
     - `Authorization`: `Bearer {{access_token}}`

---

## 🔒 Security Features

- ✅ Passwords hashed với bcrypt (10 rounds)
- ✅ JWT tokens signed với secrets
- ✅ Refresh tokens stored in Redis
- ✅ HttpOnly cookies cho refresh tokens
- ✅ CORS configured
- ✅ Helmet security headers
- ✅ Rate limiting (100 requests per 15 minutes)
- ✅ Input validation với express-validator
- ✅ SQL injection protection (parameterized queries)

---

## 📊 Rate Limiting

All API endpoints under `/api/` are rate limited:

- **Window**: 15 minutes
- **Max Requests**: 100 per IP
- **Response when exceeded**:
```json
{
  "message": "Too many requests, please try again later."
}
```

---

## 🔄 Token Refresh Flow

```
1. Client makes request with expired access token
   ↓
2. Server returns 401 Unauthorized
   ↓
3. Client auto sends refresh token to /auth/refresh
   ↓
4. Server validates refresh token from Redis
   ↓
5. If valid, server generates new access token
   ↓
6. Client retries original request with new token
   ↓
7. Success!
```

---

## 🌐 CORS Configuration

Allowed origins (từ `CLIENT_URL` trong .env):
- `http://localhost:5173` (default)

Credentials: Enabled (để gửi cookies)

---

## 📝 Notes

- Tất cả timestamps ở UTC
- Email addresses được normalize (lowercase)
- Passwords không bao giờ được trả về trong responses
- Refresh tokens tự động xóa khỏi Redis khi logout
- Refresh tokens expire sau 7 ngày (hoặc khi logout)

---

**For more details, check the source code in `backend/src/`**

