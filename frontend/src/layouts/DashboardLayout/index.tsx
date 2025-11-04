import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { useAuth } from '../../hooks/useAuth'
import { Button } from '../../components/ui/Button'
import { LogOut, User, Home } from 'lucide-react'
import styles from './styles.module.css'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { logout } = useAuth()
  const { user } = useSelector((state: RootState) => state.auth)

  const handleLogout = (): void => {
    logout()
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerLeft}>
            <div className={styles.logoWrapper}>
              <Home className={styles.logoIcon} />
              <h1 className={styles.title}>Dashboard</h1>
            </div>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.userInfo}>
              <User className={styles.userIcon} />
              <span className={styles.userName}>
                {user?.name || 'User'}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className={styles.logoutBtn}
              data-testid="logout-btn"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout

