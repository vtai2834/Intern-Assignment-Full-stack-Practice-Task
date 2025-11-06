import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { useAuth } from '../../hooks/useAuth'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  const { getCurrentUser } = useAuth()
  const [isVerifying, setIsVerifying] = useState(true)

  // Verify authentication từ cookies khi component mount
  useEffect(() => {
    const verifyAuth = async () => {
      // Nếu đã có user trong Redux, không cần verify
      if (isAuthenticated) {
        setIsVerifying(false)
        return
      }

      // Nếu chưa có user, verify từ cookies
      try {
        await getCurrentUser()
      } catch (error) {
        // Token invalid hoặc không có token
        console.log('No valid token found')
      } finally {
        setIsVerifying(false)
      }
    }

    verifyAuth()
  }, []) // Chỉ chạy một lần khi component mount

  // Show loading khi đang verify
  if (isVerifying) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div>Loading...</div>
      </div>
    )
  }

  // Redirect về login nếu không authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute

