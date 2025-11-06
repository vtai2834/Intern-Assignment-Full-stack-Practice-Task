# Full-Stack Authentication & Dashboard Application

A modern full-stack web application featuring JWT-based authentication, a responsive dashboard with data visualization, and a complete user management system. Built with React, Express.js, MongoDB, and Redis.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)
- [Assumptions & Trade-offs](#assumptions--trade-offs)
- [Screenshots & Demo](#screenshots--demo)

## ✨ Features

### Authentication
- ✅ User registration and login
- ✅ JWT-based authentication (Access + Refresh tokens)
- ✅ Secure password hashing with bcrypt
- ✅ Redis for refresh token storage
- ✅ Automatic token refresh
- ✅ Protected routes
- ✅ Cookie-based refresh token (httpOnly, secure)

### Dashboard
- ✅ Responsive sidebar with collapsible navigation
- ✅ Interactive calendar with date range picker
- ✅ Data visualization with bar charts (Recharts)
- ✅ Lead generation metrics (People/Companies tabs)
- ✅ Contact management (Most/Least visited)
- ✅ Theme switching (Light/Dark/System)
- ✅ User settings modal
- ✅ Organization switcher

### UI/UX
- ✅ Modern design with Tailwind CSS
- ✅ ShadCN UI components
- ✅ Responsive layout
- ✅ Dark mode support
- ✅ Form validation with React Hook Form + Zod
- ✅ Loading states and error handling

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **ShadCN UI** - Component library
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **React Hook Form + Zod** - Form validation
- **Recharts** - Chart library
- **Axios** - HTTP client
- **Radix UI** - Unstyled UI primitives

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **Redis** - Token storage and caching
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Express Validator** - Input validation
- **Cookie Parser** - Cookie handling
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - API protection

## 📁 Project Structure

```
FS_devSammurai/
├── backend/                    # Backend API Server
│   ├── src/
│   │   ├── config/            # Configuration files
│   │   │   ├── db.config.js   # MongoDB connection config
│   │   │   └── redis.js       # Redis connection
│   │   ├── controllers/       # Request handlers
│   │   │   ├── auth.controller.js
│   │   │   └── user.controller.js
│   │   ├── database/          # Database setup
│   │   │   ├── db.js         # MongoDB connection
│   │   │   └── seed.js       # Seed script
│   │   ├── middlewares/      # Express middlewares
│   │   │   ├── auth.middleware.js
│   │   │   ├── error.middleware.js
│   │   │   └── validation.middleware.js
│   │   ├── models/           # Mongoose models
│   │   │   └── user.model.js
│   │   ├── routes/           # API routes
│   │   │   ├── auth.routes.js
│   │   │   └── user.routes.js
│   │   ├── services/         # Business logic
│   │   │   ├── auth.service.js
│   │   │   └── user.service.js
│   │   └── server.js         # Entry point
│   ├── package.json
│   └── README.md
│
├── frontend/                   # Frontend React Application
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── dashboard/    # Dashboard components
│   │   │   │   ├── calendar/ # Calendar component
│   │   │   │   ├── cards/   # Card components
│   │   │   │   ├── header/  # Header component
│   │   │   │   ├── modals/  # Modal components
│   │   │   │   └── sidebar.tsx
│   │   │   ├── forms/       # Form components
│   │   │   ├── sidebar/     # Sidebar component
│   │   │   ├── socialButtons/ # Social auth buttons
│   │   │   └── ui/          # ShadCN UI components
│   │   ├── constants/        # Constants and data
│   │   │   ├── avatarUtils.ts
│   │   │   ├── brandLogos.tsx
│   │   │   └── homePageData.ts
│   │   ├── hooks/            # Custom React hooks
│   │   │   ├── useAuth.ts
│   │   │   └── useTheme.ts
│   │   ├── layouts/          # Layout components
│   │   │   ├── AuthLayout/
│   │   │   ├── DashboardLayout/
│   │   │   └── Theme/
│   │   ├── pages/            # Page components
│   │   │   ├── HomePage/
│   │   │   ├── LoginPage/
│   │   │   └── SignupPage/
│   │   ├── routes/           # Route components
│   │   │   └── ProtectedRoute/
│   │   ├── services/         # API services
│   │   │   └── api/
│   │   │       ├── auth.ts
│   │   │       └── axios.ts
│   │   ├── store/            # Redux store
│   │   │   ├── slices/
│   │   │   │   └── authSlice.ts
│   │   │   └── store.ts
│   │   ├── App.tsx           # Main app component
│   │   ├── main.tsx          # Entry point
│   │   └── index.css         # Global styles
│   ├── .env.example          # Environment variables template
│   ├── package.json
│   ├── vite.config.ts        # Vite configuration
│   ├── tailwind.config.js    # Tailwind configuration
│   └── tsconfig.json         # TypeScript configuration
│
└── README.md                  # This file
```

## 🚀 Setup Instructions

### Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **Docker** and **Docker Compose** - [Download Docker Desktop](https://www.docker.com/products/docker-desktop/)
- **npm** or **yarn** package manager

**Note:** MongoDB and Redis will be run using Docker Compose, so you don't need to install them separately.

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd FS_devSammurai
```

### Step 2: Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   Create a `.env` file in the `backend` directory with the following variables:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/auth_app
   # Or for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/auth_app

   # JWT Configuration
   JWT_ACCESS_SECRET=your_super_secret_access_key_change_this_in_production
   JWT_REFRESH_SECRET=your_super_secret_refresh_key_change_this_in_production
   JWT_ACCESS_EXPIRES_IN=15m
   JWT_REFRESH_EXPIRES_IN=7d

   # Redis Configuration
   REDIS_HOST=localhost
   REDIS_PORT=6379
   REDIS_PASSWORD=

   # CORS Configuration
   CLIENT_URL=http://localhost:5173
   ```

4. **Start MongoDB and Redis with Docker:**
   
   Make sure you have Docker and Docker Compose installed on your system.
   
   ```bash
   # From the root directory (FS_devSammurai)
   docker-compose up -d
   ```
   
   This will start both MongoDB and Redis containers in the background.
   
   **Note:** If you don't have Docker installed, you can install it from:
   - [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Windows/Mac)
   - [Docker Engine](https://docs.docker.com/engine/install/) (Linux)
   
   To stop the containers:
   ```bash
   docker-compose down
   ```
   
   To view running containers:
   ```bash
   docker-compose ps
   ```
   
   To view logs:
   ```bash
   docker-compose logs -f
   ```

6. **Seed the database (optional):**
   ```bash
   npm run db:seed
   ```

7. **Start the backend server:**
   ```bash
   npm run dev
   ```

   The backend server will start at `http://localhost:5000`

   You should see:
   ```
   ✅ MongoDB connected successfully
   ✅ Redis connected successfully
   🚀 Server running on port 5000
   ```

### Step 3: Frontend Setup

1. **Open a new terminal and navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   Copy `.env.example` to `.env`:
   ```bash
   # On Windows PowerShell:
   Copy-Item .env.example .env
   
   # On macOS/Linux:
   cp .env.example .env
   ```

   The `.env` file should contain:
   ```env
   # API Configuration
   # Backend API URL - API server address
   VITE_API_URL=http://localhost:5000/api
   ```

   **Note:** In Vite, all environment variables must have the `VITE_` prefix to be exposed to client-side code.

4. **Start the frontend development server:**
   ```bash
   npm run dev
   ```

   The frontend will start at `http://localhost:5173`

### Step 4: Access the Application

1. Open your browser and navigate to:
   - **Frontend:** http://localhost:5173
   - **Backend API:** http://localhost:5000

2. **Test the application:**
   - Click "Sign up" to create a new account
   - Log in with your credentials
   - You'll be redirected to the dashboard

### Troubleshooting

**Backend issues:**
- **MongoDB connection failed:** Make sure MongoDB is running and the connection string in `.env` is correct
- **Redis connection failed:** Ensure Redis is running on the specified host and port
- **Port already in use:** Change the `PORT` in `.env` to a different port

**Frontend issues:**
- **API calls failing:** Check that `VITE_API_URL` in `.env` matches your backend URL
- **Build errors:** Make sure all dependencies are installed with `npm install`
- **TypeScript errors:** Run `npm run build` to check for type errors

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### POST `/api/auth/signup`
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "accessToken": "jwt_access_token"
  }
}
```

#### POST `/api/auth/login`
Login with email and password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "accessToken": "jwt_access_token"
  }
}
```

**Note:** Refresh token is sent as an httpOnly cookie.

#### POST `/api/auth/refresh`
Refresh the access token using the refresh token cookie.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "accessToken": "new_jwt_access_token"
  }
}
```

#### POST `/api/auth/logout`
Logout and invalidate the refresh token.

**Response (200):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

### User Endpoints (Protected)

#### GET `/api/users/me`
Get current user information.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

## 🎯 Assumptions & Trade-offs

### Assumptions

1. **MongoDB over PostgreSQL:**
   - Chosen for easier setup and faster development
   - Flexible schema is suitable for rapid iteration
   - Can be easily migrated to PostgreSQL if needed

2. **Redis for Token Storage:**
   - Used for refresh token storage to enable token revocation
   - Can be extended for caching and rate limiting in the future
   - In-memory storage provides fast token lookups

3. **Token Expiration:**
   - Access token: 15 minutes (balance between security and UX)
   - Refresh token: 7 days (reasonable session duration)
   - These values can be adjusted based on security requirements

4. **Cookie-based Refresh Tokens:**
   - httpOnly cookies prevent XSS attacks
   - Secure flag should be enabled in production (HTTPS)
   - SameSite attribute helps prevent CSRF attacks

5. **Development Environment:**
   - Vite proxy configured for `/api` routes during development
   - CORS enabled for localhost during development
   - Rate limiting configured but not strict for development

### Trade-offs

1. **Email Verification:**
   - Not implemented to simplify the initial setup
   - Can be added later using services like SendGrid or Nodemailer
   - Email verification would improve security and user trust

2. **Password Reset:**
   - "Forgot password" flow not implemented
   - Common in production apps but omitted for simplicity
   - Would require email service integration

3. **Password Requirements:**
   - Minimum 8 characters (can be enhanced with complexity requirements)
   - No password strength meter in UI
   - Could add requirements for uppercase, lowercase, numbers, special characters

4. **Error Handling:**
   - Basic error handling implemented
   - Could be more detailed with error codes and user-friendly messages
   - Error logging not implemented (could use Winston, Pino, etc.)

5. **Testing:**
   - No unit tests or integration tests included
   - Testing framework can be added (Jest, Vitest, React Testing Library)
   - Important for production applications

6. **Database Migrations:**
   - No formal migration system (MongoDB doesn't require it)
   - Schema changes handled manually
   - Could use a migration tool for better version control

7. **API Documentation:**
   - Basic endpoint documentation in README
   - Could use Swagger/OpenAPI for interactive documentation
   - Would improve developer experience

8. **UI Components:**
   - Dashboard uses mock data (not connected to real backend)
   - Charts and contact lists are static
   - Would need backend endpoints to fetch real data

9. **Type Safety:**
   - Frontend uses TypeScript (good type safety)
   - Backend uses JavaScript (no type checking)
   - Could migrate backend to TypeScript for consistency

10. **Deployment:**
    - No Docker configuration included
    - No CI/CD pipeline setup
    - Would need these for production deployment

## 📸 Screenshots & Demo

### Demo Links

**Live Application:**
- **Frontend (Vercel):** [https://intern-assignment-full-stack-practi.vercel.app/](https://intern-assignment-full-stack-practi.vercel.app/)
- **Backend API (Render):** [https://vtai2834-be-assignment-devsammurai.onrender.com](https://vtai2834-be-assignment-devsammurai.onrender.com)

**Note:** All services are deployed on free tier plans, so initial load times may be slower due to cold starts.

### Screenshots
Some screenshots demo app in folder /screenshots

### Deployment Instructions

**Frontend (Vercel):**
1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables:
   - `VITE_API_URL=https://vtai2834-be-assignment-devsammurai.onrender.com/api`
4. Deploy

**Backend (Render):**
1. Push code to GitHub
2. Create new Web Service on Render
3. Set build command: `cd backend && npm install`
4. Set start command: `cd backend && npm start`
5. Set environment variables:
   - `NODE_ENV=production`
   - `PORT=5000` (or let Render assign automatically)
   - `MONGODB_URI=mongodb+srv://...` (MongoDB Atlas connection string)
   - `REDIS_HOST=...` (Redis Cloud host)
   - `REDIS_PORT=...` (Redis Cloud port)
   - `REDIS_USERNAME=default`
   - `REDIS_PASSWORD=...` (Redis Cloud password)
   - `REDIS_TLS=false` (or `true` if Redis Cloud requires TLS)
   - `JWT_ACCESS_SECRET=...` (your secret key)
   - `JWT_REFRESH_SECRET=...` (your secret key)
   - `JWT_ACCESS_EXPIRES_IN=15m`
   - `JWT_REFRESH_EXPIRES_IN=7d`
   - `CLIENT_URL=https://intern-assignment-full-stack-practi.vercel.app`
6. Deploy

**Database & Redis:**
- **MongoDB:** Hosted on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Free tier - M0 cluster)
- **Redis:** Hosted on [Redis Cloud](https://redis.com/try-free/) (Free tier - 30MB storage)

**Note:** All services are using free tier plans, which may have limitations:
- Cold start delays (especially on Render)
- Limited resources (CPU, memory, storage)
- Rate limiting on free tiers
- Slower response times compared to paid plans

## 📝 Additional Notes

### Development Workflow

1. **Backend Development:**
   ```bash
   cd backend
   npm run dev  # Runs with nodemon (auto-restart)
   ```

2. **Frontend Development:**
   ```bash
   cd frontend
   npm run dev  # Vite dev server with HMR
   ```

3. **Building for Production:**
   ```bash
   # Frontend
   cd frontend
   npm run build  # Creates dist/ folder
   
   # Backend
   cd backend
   npm start  # Runs production server
   ```

### Code Style

- **Frontend:** TypeScript with functional components and React hooks
- **Backend:** ES6+ modules with Express.js MVC pattern
- **Formatting:** ESLint configured for both projects
- **CSS:** Tailwind CSS utility classes with custom CSS for complex components

### Security Considerations

1. **JWT Secrets:** Use strong, unique secrets in production
2. **HTTPS:** Enable HTTPS in production (required for secure cookies)
3. **CORS:** Configure CORS properly for production domains
4. **Rate Limiting:** Already configured, adjust limits for production
5. **Environment Variables:** Never commit `.env` files to git
6. **Password Hashing:** bcrypt with salt rounds (default: 10)

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Redis Documentation](https://redis.io/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [ShadCN UI](https://ui.shadcn.com)
- [Redux Toolkit](https://redux-toolkit.js.org)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Phan Van Tai

## 🙏 Acknowledgments

- [ShadCN UI](https://ui.shadcn.com) for beautiful, accessible components
- [Achromatic](https://demo.achromatic.dev) for UI design reference
- [Radix UI](https://www.radix-ui.com) for unstyled, accessible primitives
