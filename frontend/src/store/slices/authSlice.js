import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as authAPI from '../../services/api/auth'

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
  loading: false,
  error: null,
}

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(credentials)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed')
    }
  }
)

export const signup = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authAPI.signup(userData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Signup failed')
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authAPI.logout()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }
)

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.getCurrentUser()
      return response.data.user
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get user')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setCredentials: (state, action) => {
      state.user = action.payload.user
      state.accessToken = action.payload.accessToken
      state.isAuthenticated = true
      
      localStorage.setItem('user', JSON.stringify(action.payload.user))
      localStorage.setItem('accessToken', action.payload.accessToken)
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.accessToken = action.payload.accessToken
        state.isAuthenticated = true
        
        localStorage.setItem('user', JSON.stringify(action.payload.user))
        localStorage.setItem('accessToken', action.payload.accessToken)
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Signup
      .addCase(signup.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(signup.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.accessToken = null
        state.isAuthenticated = false
        
        localStorage.removeItem('user')
        localStorage.removeItem('accessToken')
      })
      // Get current user
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload
        localStorage.setItem('user', JSON.stringify(action.payload))
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.user = null
        state.accessToken = null
        state.isAuthenticated = false
        
        localStorage.removeItem('user')
        localStorage.removeItem('accessToken')
      })
  },
})

export const { clearError, setCredentials } = authSlice.actions
export default authSlice.reducer

