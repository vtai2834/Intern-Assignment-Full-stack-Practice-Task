# Frontend - Auth App

Frontend application cho authentication system sử dụng React, Vite, Tailwind CSS, và Redux Toolkit.

## 🛠 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Styling
- **ShadCN UI** - UI components
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Redux Toolkit** - State management
- **React Router** - Routing
- **Axios** - HTTP client
- **Lucide React** - Icons

## 📁 Cấu Trúc Thư Mục

```
frontend/
├── public/
├── src/
│   ├── components/         # Reusable components
│   │   ├── ui/            # ShadCN UI components
│   │   │   ├── Alert.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Input.jsx
│   │   │   └── Label.jsx
│   │   ├── AuthLayout.jsx
│   │   ├── DashboardLayout.jsx
│   │   ├── FormField.jsx
│   │   └── ProtectedRoute.jsx
│   ├── lib/               # Utility functions
│   │   └── utils.js
│   ├── pages/             # Page components
│   │   ├── dashboard/
│   │   │   └── HomePage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── LoginPage.jsx
│   │   └── SignupPage.jsx
│   ├── services/          # API services
│   │   └── api/
│   │       ├── auth.js
│   │       └── axios.js
│   ├── store/             # Redux store
│   │   ├── slices/
│   │   │   └── authSlice.js
│   │   └── store.js
│   ├── App.jsx            # Main app component
│   ├── index.css          # Global styles
│   └── main.jsx           # Entry point
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── jsconfig.json
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Environment Variables (Optional)

Tạo file `.env` nếu cần custom API URL:

```env
VITE_API_URL=http://localhost:5000/api
```

Mặc định, app sẽ sử dụng proxy đến `http://localhost:5000/api`

### 3. Start Development Server

```bash
npm run dev
```

App sẽ chạy tại `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

### 5. Preview Production Build

```bash
npm run preview
```

## 📄 Pages & Routes

| Route | Page | Description | Protected |
|-------|------|-------------|-----------|
| `/login` | LoginPage | Trang đăng nhập | ❌ |
| `/signup` | SignupPage | Trang đăng ký | ❌ |
| `/dashboard/home` | HomePage | Trang chủ dashboard | ✅ |

## 🔐 Authentication Flow

1. **Login/Signup**: User điền form và submit
2. **Validation**: React Hook Form + Zod validate dữ liệu
3. **API Call**: Axios gửi request đến backend
4. **Store Token**: Access token được lưu vào Redux store và localStorage
5. **Redirect**: Navigate đến dashboard
6. **Auto Refresh**: Khi access token hết hạn, tự động refresh bằng refresh token
7. **Protected Routes**: `ProtectedRoute` component kiểm tra authentication

## 🧩 Key Components

### UI Components (ShadCN Style)

- **Button**: Multiple variants (default, outline, ghost, etc.)
- **Input**: Form input với styling
- **Card**: Card container và variants
- **Label**: Form label
- **Alert**: Alert messages

### Layout Components

- **AuthLayout**: Layout cho login/signup pages
- **DashboardLayout**: Layout cho dashboard với header và nav
- **ProtectedRoute**: HOC để bảo vệ routes cần authentication

### Form Components

- **FormField**: Reusable form field với label và error message

## 🎨 Styling

App sử dụng **Tailwind CSS** với **ShadCN** design system:

- CSS variables cho theming
- Dark mode ready (chưa implement toggle)
- Responsive design
- Custom components với `class-variance-authority`

## 📦 State Management

**Redux Toolkit** được sử dụng cho global state:

### Auth Slice
```javascript
{
  user: { id, name, email, ... },
  accessToken: "...",
  isAuthenticated: true/false,
  loading: true/false,
  error: null/string
}
```

### Actions
- `login(credentials)` - Đăng nhập
- `signup(userData)` - Đăng ký
- `logout()` - Đăng xuất
- `getCurrentUser()` - Lấy thông tin user hiện tại

## 🔌 API Integration

### Axios Instance

Tự động thêm:
- Bearer token vào header
- Refresh token khi hết hạn
- Redirect về login khi unauthorized

### API Methods

```javascript
// Auth
authAPI.login({ email, password })
authAPI.signup({ name, email, password })
authAPI.logout()
authAPI.getCurrentUser()
```

## ✅ Form Validation

Sử dụng **Zod** schemas:

### Login
- Email: valid email format
- Password: required

### Signup
- Name: min 2 characters
- Email: valid email format
- Password: min 6 characters
- Confirm Password: must match password

## 🎯 Test-Ready Features

Components có `data-testid` attributes:

- `login-btn` - Login button
- `signup-btn` - Signup button
- `logout-btn` - Logout button

## ⚡ Performance

- Vite cho fast HMR
- Code splitting với React Router
- Lazy loading (có thể thêm)
- Optimized bundle size

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm, md, lg, xl, 2xl
- Touch-friendly UI elements

## 🔧 Development Tools

- **ESLint** - Code linting
- **Vite** - Fast development server
- **React DevTools** - Debug React components
- **Redux DevTools** - Debug state

## 🚀 Deployment

Có thể deploy lên:
- **Vercel** (recommended for Vite)
- **Netlify**
- **Render**
- **GitHub Pages**

Build command: `npm run build`
Output directory: `dist`

## 📝 Notes

- Refresh token được lưu trong httpOnly cookie (backend set)
- Access token được lưu trong localStorage và Redux store
- Tự động logout khi refresh token hết hạn hoặc invalid
- UI references: https://demo.achromatic.dev

## 🎨 Customization

### Colors

Chỉnh sửa trong `src/index.css`:

```css
:root {
  --primary: 222.2 47.4% 11.2%;
  --secondary: 210 40% 96.1%;
  /* ... more colors */
}
```

### Components

ShadCN components có thể customize qua props hoặc extend trong `tailwind.config.js`
