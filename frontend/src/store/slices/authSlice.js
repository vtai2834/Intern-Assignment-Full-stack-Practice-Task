import { createSlice } from '@reduxjs/toolkit'

// Load user from localStorage
const loadUserFromStorage = () => {
  try {
    const user = localStorage.getItem('user')
    const token = localStorage.getItem('accessToken')
    if (user && token) {
      return { user: JSON.parse(user), token }
    }
  } catch (error) {
    console.error('Error loading user from storage:', error)
  }
  return { user: null, token: null }
}

const { user: initialUser, token: initialToken } = loadUserFromStorage()

const initialState = {
  user: initialUser,
  accessToken: initialToken,
  isAuthenticated: !!initialToken,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Set user và token khi login thành công
    setAuth: (state, action) => {
      state.user = action.payload.user
      state.accessToken = action.payload.accessToken
      state.isAuthenticated = true
      
      // Lưu vào localStorage
      localStorage.setItem('user', JSON.stringify(action.payload.user))
      localStorage.setItem('accessToken', action.payload.accessToken)
    },
    
    // Cập nhật user info
    updateUser: (state, action) => {
      state.user = action.payload
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    
    // Clear auth khi logout
    clearAuth: (state) => {
      state.user = null
      state.accessToken = null
      state.isAuthenticated = false
      
      // Xóa khỏi localStorage
      localStorage.removeItem('user')
      localStorage.removeItem('accessToken')
    },
  },
})

export const { setAuth, updateUser, clearAuth } = authSlice.actions
export default authSlice.reducer
