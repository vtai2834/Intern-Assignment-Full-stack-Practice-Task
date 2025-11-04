# Full-Stack Authentication App

Ứng dụng authentication full-stack đơn giản với React, Express, PostgreSQL, và Redis.

## 📋 Tổng Quan

Đây là một ứng dụng authentication hoàn chỉnh được xây dựng để thực hành full-stack development với các công nghệ hiện đại.

### ✨ Features

- ✅ User registration & login
- ✅ JWT-based authentication (Access + Refresh tokens)
- ✅ Secure password hashing với bcrypt
- ✅ Redis để lưu refresh tokens
- ✅ PostgreSQL database
- ✅ Form validation với React Hook Form + Zod
- ✅ State management với Redux Toolkit
- ✅ Modern UI với Tailwind CSS & ShadCN components
- ✅ Protected routes
- ✅ Auto token refresh
- ✅ Responsive design

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **ShadCN UI** - Component library
- **React Hook Form + Zod** - Form validation
- **Redux Toolkit** - State management
- **React Router** - Routing
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **Redis** - Token storage
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Express Validator** - Input validation

## 📁 Cấu Trúc Project

```
FS_devSammurai/
├── backend/                    # Backend API
│   ├── src/
│   │   ├── config/            # Configuration (DB, Redis)
│   │   ├── controllers/       # Request handlers
│   │   ├── database/          # DB setup & migrations
│   │   ├── middlewares/       # Express middlewares
│   │   ├── models/            # Database models
│   │   ├── routes/            # API routes
│   │   ├── services/          # Business logic
│   │   └── server.js          # Entry point
│   ├── package.json
│   └── README.md
│
├── frontend/                   # Frontend React app
│   ├── src/
│   │   ├── components/        # React components
│   │   │   └── ui/           # ShadCN UI components
│   │   ├── lib/              # Utilities
│   │   ├── pages/            # Page components
│   │   ├── services/         # API services
│   │   ├── store/            # Redux store & slices
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── README.md
│
└── README.md                   # This file
```

## 🚀 Quick Start

### Prerequisites

Đảm bảo bạn đã cài đặt:
- Node.js (v18+)
- PostgreSQL (v14+)
- Redis (v6+)
- npm hoặc yarn

### 1. Clone Repository

```bash
git clone <repository-url>
cd FS_devSammurai
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Tạo file `.env`:

```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=auth_app
DB_USER=postgres
DB_PASSWORD=your_password

JWT_ACCESS_SECRET=your_access_secret_key_here
JWT_REFRESH_SECRET=your_refresh_secret_key_here
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

CLIENT_URL=http://localhost:5173
```

Tạo database và chạy migrations:

```bash
# Tạo database trong PostgreSQL
createdb auth_app

# Chạy migrations
npm run db:migrate

# (Optional) Seed data
npm run db:seed
```

Start backend server:

```bash
npm run dev
```

Backend sẽ chạy tại `http://localhost:5000`

### 3. Setup Frontend

Mở terminal mới:

```bash
cd frontend
npm install
```

(Optional) Tạo file `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend dev server:

```bash
npm run dev
```

Frontend sẽ chạy tại `http://localhost:5173`

### 4. Access Application

Mở browser và truy cập:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📡 API Endpoints

### Authentication

```
POST   /api/auth/signup      - Đăng ký user mới
POST   /api/auth/login       - Đăng nhập
POST   /api/auth/refresh     - Refresh access token
POST   /api/auth/logout      - Đăng xuất
```

### User (Protected)

```
GET    /api/users/me         - Lấy thông tin user hiện tại
PUT    /api/users/me         - Cập nhật thông tin user
```

## 🔐 Authentication Flow

```
1. User đăng ký/đăng nhập
   ↓
2. Backend tạo Access Token (15m) và Refresh Token (7d)
   ↓
3. Refresh Token lưu vào Redis và gửi về cookie (httpOnly)
   ↓
4. Access Token gửi về response body
   ↓
5. Frontend lưu Access Token vào localStorage & Redux
   ↓
6. Mỗi request cần auth gửi: Authorization: Bearer <access_token>
   ↓
7. Khi Access Token hết hạn → tự động refresh
   ↓
8. Logout → xóa Refresh Token khỏi Redis
```

## 🗃 Database Schema

### Users Table

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🎨 UI Reference

Design reference từ: https://demo.achromatic.dev

## 📸 Screenshots

(Có thể thêm screenshots sau khi deploy)

## ✅ Testing

### Backend

```bash
cd backend
# Add test commands khi có tests
```

### Frontend

```bash
cd frontend
# Add test commands khi có tests
```

Key buttons đã có `data-testid`:
- `login-btn`
- `signup-btn`
- `logout-btn`

## 🚀 Deployment

### Backend

Có thể deploy lên:
- Render
- Railway
- Heroku
- DigitalOcean

### Frontend

Có thể deploy lên:
- Vercel (recommended)
- Netlify
- Render

### Database & Redis

- PostgreSQL: Supabase, Render, Railway
- Redis: Redis Cloud, Upstash

## 📝 Assumptions & Trade-offs

### Assumptions
- PostgreSQL được chọn thay vì MongoDB để practice SQL
- Redis được dùng cho refresh tokens (có thể mở rộng cho caching, rate limiting)
- Access token expire sau 15 phút (balance giữa security và UX)
- Refresh token expire sau 7 ngày

### Trade-offs
- Chưa implement email verification (để đơn giản)
- Chưa có "forgot password" flow
- Password tối thiểu 6 ký tự (có thể thêm yêu cầu phức tạp hơn)
- UI đơn giản, tập trung vào functionality

## 🔧 Development

### Code Style

- Backend: ES6+ modules, MVC + Service pattern
- Frontend: Functional components, hooks
- Formatting: Consistent với ESLint

### Git Workflow

```bash
git checkout -b feature/your-feature
git commit -m "feat: add your feature"
git push origin feature/your-feature
```

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [Express.js](https://expressjs.com)
- [Tailwind CSS](https://tailwindcss.com)
- [ShadCN UI](https://ui.shadcn.com)

## 🤝 Contributing

1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT

## 👨‍💻 Author

Intern Assignment Project

## 🙏 Acknowledgments

- ShadCN UI for beautiful components
- Achromatic for UI reference design

