import React from 'react'
import styles from './styles.module.css'

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {children}
      </div>
    </div>
  )
}

export default AuthLayout

