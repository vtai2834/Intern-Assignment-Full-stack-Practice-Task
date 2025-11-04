import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as authAPI from '../services/api/auth'
import { setUser, clearUser, updateUser } from '../store/slices/authSlice'

export const useAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Đăng ký
  const signup = async (userData) => {
    try {
      setLoading(true)
      setError(null)
      
      await authAPI.signup(userData)
      
      setLoading(false)
      return { success: true }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Signup failed'
      setError(errorMessage)
      setLoading(false)
      return { success: false, error: errorMessage }
    }
  }

  // Đăng nhập
  const login = async (credentials) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await authAPI.login(credentials)
      const { user } = response.data.data
      
      // Chỉ lưu user vào Redux (tokens đã ở trong cookies)
      dispatch(setUser(user))
      
      setLoading(false)
      return { success: true, data: { user } }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed'
      setError(errorMessage)
      setLoading(false)
      return { success: false, error: errorMessage }
    }
  }

  // Đăng xuất
  const logout = async () => {
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
  const getCurrentUser = async () => {
    try {
      const response = await authAPI.getCurrentUser()
      const user = response.data.data.user
      
      // Update Redux
      dispatch(updateUser(user))
      
      return { success: true, data: user }
    } catch (err) {
      console.error('Get current user error:', err)
      // Nếu failed, clear auth (token invalid)
      dispatch(clearUser())
      return { success: false }
    }
  }

  // Clear error
  const clearError = () => {
    setError(null)
  }

  return {
    loading,
    error,
    signup,
    login,
    logout,
    getCurrentUser,
    clearError,
  }
}
