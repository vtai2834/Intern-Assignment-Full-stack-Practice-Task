import apiClient from './axios'

export const signup = (userData) => {
  return apiClient.post('/auth/signup', userData)
}

export const login = (credentials) => {
  return apiClient.post('/auth/login', credentials)
}

export const logout = () => {
  return apiClient.post('/auth/logout')
}

export const refreshToken = () => {
  return apiClient.post('/auth/refresh')
}

export const getCurrentUser = () => {
  return apiClient.get('/users/me')
}

