import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as authAPI from '../services/api/auth'
import { setUser, clearUser, updateUser, User } from '../store/slices/authSlice'

interface SignupData {
  name: string
  email: string
  password: string
}

interface LoginCredentials {
  email: string
  password: string
}

interface AuthResult {
  success: boolean
  error?: string
  data?: { user: User }
}

export const useAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Đăng ký
  const signup = async (userData: SignupData): Promise<AuthResult> => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(null)
      
      await authAPI.signup(userData)
      
      setSuccess('Account created successfully! Redirecting to login...')
      setLoading(false)
      return { success: true }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Signup failed'
      setError(errorMessage)
      setSuccess(null)
      setLoading(false)
      return { success: false, error: errorMessage }
    }
  }

  // Đăng nhập
  const login = async (credentials: LoginCredentials): Promise<AuthResult> => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(null)
      
      const response = await authAPI.login(credentials)
      const { user } = response.data.data
      
      // Chỉ lưu user vào Redux (tokens đã ở trong cookies)
      dispatch(setUser(user))
      
      setSuccess('Login successful! Redirecting...')
      setLoading(false)
      return { success: true, data: { user } }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Login failed'
      console.log('Login error caught:', err)
      console.log('Error message:', errorMessage)
      setError(errorMessage)
      setSuccess(null)
      setLoading(false)
      console.log('Error state set to:', errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  // Đăng xuất
  const logout = async (): Promise<void> => {
    try {
      // Gọi API logout để clear cookies và Redis
      await authAPI.logout()
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      // Clear Redux state
      dispatch(clearUser())
      navigate('/login')
    }
  }

  // Lấy thông tin user hiện tại
  const getCurrentUser = async (): Promise<AuthResult> => {
    try {
      const response = await authAPI.getCurrentUser()
      const user = response.data.data.user
      
      // Update Redux
      dispatch(updateUser(user))
      
      return { success: true, data: { user } }
    } catch (err) {
      console.error('Get current user error:', err)
      // Nếu failed, clear auth (token invalid)
      dispatch(clearUser())
      return { success: false }
    }
  }

  // Clear error
  const clearError = (): void => {
    setError(null)
  }

  // Clear success
  const clearSuccess = (): void => {
    setSuccess(null)
  }

  return {
    loading,
    error,
    success,
    signup,
    login,
    logout,
    getCurrentUser,
    clearError,
    clearSuccess,
  }
}

