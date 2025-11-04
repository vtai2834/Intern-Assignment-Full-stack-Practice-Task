# Backend - Authentication API

Backend API cho ứng dụng authentication sử dụng Node.js, Express, MongoDB và Redis.

## 🛠 Tech Stack

- **Node.js** với **Express.js**
- **MongoDB** - NoSQL Database
- **Mongoose** - ODM (Object Data Modeling)
- **Redis** - Token storage
- **JWT** - Authentication (Access + Refresh tokens)
- **bcryptjs** - Password hashing

## 📁 Cấu Trúc Thư Mục

```
backend/
├── src/
│   ├── config/           # Configuration files
│   │   ├── db.config.js
│   │   └── redis.js
│   ├── controllers/      # Request handlers
│   │   ├── auth.controller.js
│   │   └── user.controller.js
│   ├── database/         # Database setup
│   │   ├── db.js
│   │   └── seed.js
│   ├── middlewares/      # Express middlewares
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   └── validation.middleware.js
│   ├── models/           # Mongoose models
│   │   └── user.model.js
│   ├── routes/           # API routes
│   │   ├── auth.routes.js
│   │   └── user.routes.js
│   ├── services/         # Business logic
│   │   ├── auth.service.js
│   │   └── user.service.js
│   └── server.js         # Entry point
├── env.example.txt
├── .gitignore
└── package.json
```

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Setup Environment Variables

Tạo file `.env` từ `env.example.txt`:

```bash
cp env.example.txt .env
```

Cập nhật các biến môi trường trong file `.env`:

```env
PORT=5000
NODE_ENV=development

# MongoDB - Local
MONGODB_URI=mongodb://localhost:27017/auth_app

# MongoDB Atlas - Cloud (nếu dùng)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/auth_app

JWT_ACCESS_SECRET=your_access_token_secret_key_here
JWT_REFRESH_SECRET=your_refresh_token_secret_key_here
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

CLIENT_URL=http://localhost:5173
```

### 3. Setup MongoDB

**Option 1: MongoDB Local**

Cài đặt MongoDB Community Edition:
- Windows: https://www.mongodb.com/try/download/community
- macOS: `brew install mongodb-community`
- Linux: `sudo apt-get install mongodb`

Start MongoDB:
```bash
# Windows
# MongoDB Compass hoặc mongod.exe

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**Option 2: MongoDB Atlas (Cloud - Free)**

1. Tạo account tại https://www.mongodb.com/cloud/atlas
2. Tạo free cluster
3. Tạo database user
4. Whitelist IP (0.0.0.0/0 cho development)
5. Copy connection string vào `.env`

### 4. Setup Redis

Đảm bảo Redis đang chạy:

```bash
# Windows (với WSL hoặc Docker)
redis-server

# macOS
brew services start redis

# Linux
sudo systemctl start redis

# Hoặc Docker
docker run -d -p 6379:6379 redis
```

### 5. Seed Database (Optional)

```bash
npm run db:seed
```

Test accounts sau khi seed:
- `test@example.com` / `password123`
- `admin@example.com` / `password123`
- `demo@example.com` / `password123`

### 6. Start Development Server

```bash
npm run dev
```

Server sẽ chạy tại `http://localhost:5000`

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/signup` | Đăng ký user mới | ❌ |
| POST | `/api/auth/login` | Đăng nhập | ❌ |
| POST | `/api/auth/refresh` | Refresh access token | ❌ |
| POST | `/api/auth/logout` | Đăng xuất | ❌ |

### User

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/users/me` | Lấy thông tin user hiện tại | ✅ |
| PUT | `/api/users/me` | Cập nhật thông tin user | ✅ |

## 📝 API Usage Examples

### Sign Up

```bash
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    "accessToken": "eyJhbGc..."
  }
}
```

### Get Profile (Protected)

```bash
GET /api/users/me
Authorization: Bearer <access_token>
```

## 🏗 Architecture

Ứng dụng sử dụng mô hình **MVC + Service Layer**:

- **Models**: Mongoose schemas & models
- **Controllers**: Xử lý HTTP requests/responses
- **Services**: Business logic
- **Middlewares**: Authentication, validation, error handling
- **Routes**: Định nghĩa API endpoints

## 🗃 Database Schema (MongoDB)

### User Collection

```javascript
{
  _id: ObjectId,
  name: String (required, 2-100 chars),
  email: String (required, unique, lowercase),
  password_hash: String (required, not returned in queries),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

**Indexes:**
- `email: 1` (unique)

## 🔐 Authentication Flow

1. User đăng ký/đăng nhập
2. Server tạo Access Token (15 phút) và Refresh Token (7 ngày)
3. Refresh Token được lưu vào Redis và gửi về client dưới dạng httpOnly cookie
4. Access Token được gửi về client trong response body
5. Client gửi Access Token trong header `Authorization: Bearer <token>` cho các request cần authentication
6. Khi Access Token hết hạn, client gửi Refresh Token để lấy Access Token mới
7. Khi logout, Refresh Token bị xóa khỏi Redis

## ⚠️ Assumptions & Trade-offs

- Sử dụng MongoDB (NoSQL) thay vì PostgreSQL để dễ setup và scale
- Mongoose ODM để validate schema và queries
- Redis được dùng để lưu Refresh Tokens (có thể mở rộng cho rate limiting, caching)
- Password tối thiểu 6 ký tự (có thể thêm yêu cầu phức tạp hơn)
- Chưa implement email verification
- Chưa implement "forgot password" flow

## 📚 Dependencies

### Production
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `redis` - Redis client
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT tokens
- `express-validator` - Input validation
- `helmet` - Security headers
- `cors` - CORS middleware
- `cookie-parser` - Cookie parsing
- `dotenv` - Environment variables
- `express-rate-limit` - Rate limiting

### Development
- `nodemon` - Auto-restart server

## 🧪 Testing MongoDB Connection

```bash
# MongoDB Shell
mongosh

# Or with connection string
mongosh "mongodb://localhost:27017/auth_app"

# Show databases
show dbs

# Use database
use auth_app

# Show collections
show collections

# Find users
db.users.find()

# Count users
db.users.countDocuments()
```

## 🔧 Troubleshooting

### MongoDB Connection Error

```bash
# Check if MongoDB is running
# macOS
brew services list | grep mongodb

# Linux
sudo systemctl status mongod

# Start MongoDB
brew services start mongodb-community  # macOS
sudo systemctl start mongod             # Linux
```

### Clear Database

```bash
# In mongosh
use auth_app
db.users.drop()
```

Then run seed again:
```bash
npm run db:seed
```

## 🚀 Deployment

### MongoDB Atlas Setup
1. Create free cluster
2. Create database user
3. Whitelist IPs
4. Get connection string
5. Update `MONGODB_URI` in production `.env`

### Deploy Backend
- Render
- Railway
- Heroku
- DigitalOcean

---

**MongoDB advantages:**
- ✅ Easy setup (no migration needed)
- ✅ Flexible schema
- ✅ Good for rapid development
- ✅ Free cloud hosting (Atlas)
- ✅ Horizontal scaling
