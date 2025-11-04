import { createSlice } from '@reduxjs/toolkit'

// Load user from localStorage
const loadUserFromStorage = () => {
  try {
    const user = localStorage.getItem('user')
    if (user) {
      return JSON.parse(user)
    }
  } catch (error) {
    console.error('Error loading user from storage:', error)
  }
  return null
}

const initialUser = loadUserFromStorage()

const initialState = {
  user: initialUser,
  isAuthenticated: !!initialUser,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Set user khi login thành công
    setUser: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = true
      
      // Lưu vào localStorage
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    
    // Cập nhật user info
    updateUser: (state, action) => {
      state.user = action.payload
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    
    // Clear auth khi logout
    clearUser: (state) => {
      state.user = null
      state.isAuthenticated = false
      
      // Xóa khỏi localStorage
      localStorage.removeItem('user')
    },
  },
})

export const { setUser, updateUser, clearUser } = authSlice.actions
export default authSlice.reducer
