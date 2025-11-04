import styles from './styles.module.css'

const AuthLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {children}
      </div>
    </div>
  )
}

export default AuthLayout

