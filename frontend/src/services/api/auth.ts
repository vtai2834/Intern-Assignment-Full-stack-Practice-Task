import apiClient from './axios'
import { User } from '../../store/slices/authSlice'

interface SignupData {
  name: string
  email: string
  password: string
}

interface LoginCredentials {
  email: string
  password: string
}

interface LoginResponse {
  success: boolean
  message: string
  data: {
    user: User
  }
}

interface GetUserResponse {
  success: boolean
  data: {
    user: User
  }
}

export const signup = (userData: SignupData) => {
  return apiClient.post('/auth/signup', userData)
}

export const login = (credentials: LoginCredentials) => {
  return apiClient.post<LoginResponse>('/auth/login', credentials)
}

export const logout = () => {
  return apiClient.post('/auth/logout')
}

export const refreshToken = () => {
  return apiClient.post('/auth/refresh')
}

export const getCurrentUser = () => {
  return apiClient.get<GetUserResponse>('/users/me')
}

