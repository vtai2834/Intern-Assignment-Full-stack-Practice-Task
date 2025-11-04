import axios from 'axios'
import { store } from '../../store/store'
import { clearUser } from '../../store/slices/authSlice'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  withCredentials: true, // Quan trọng: Tự động gửi cookies
  headers: {
    'Content-Type': 'application/json',
  },
})

// Response interceptor - Xử lý auto refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Nếu error 401 và là TOKEN_EXPIRED
    if (
      error.response?.status === 401 && 
      error.response?.data?.code === 'TOKEN_EXPIRED' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true

      try {
        // Tự động gọi refresh token API
        await axios.post(
          `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/refresh`,
          {},
          { withCredentials: true } // Gửi refreshToken cookie
        )

        // Refresh thành công, retry request gốc
        return apiClient(originalRequest)
      } catch (refreshError) {
        // Refresh token cũng hết hạn hoặc invalid
        // Clear user và redirect về login
        store.dispatch(clearUser())
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    // Nếu error 401 nhưng không phải TOKEN_EXPIRED (ví dụ: TOKEN_INVALID)
    if (error.response?.status === 401) {
      store.dispatch(clearUser())
      window.location.href = '/login'
    }

    return Promise.reject(error)
  }
)

export default apiClient

