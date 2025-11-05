import React from 'react'
import './authLayout.css'

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="container">
      <div className="wrapper">
        {children}
      </div>
    </div>
  )
}

export default AuthLayout

