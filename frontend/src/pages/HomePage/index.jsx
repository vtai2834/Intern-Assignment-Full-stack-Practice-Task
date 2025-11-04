import { useSelector } from 'react-redux'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card'
import { User, Mail, Calendar } from 'lucide-react'
import styles from './styles.module.css'

const HomePage = () => {
  const { user } = useSelector((state) => state.auth)

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Welcome back, {user?.name}!</h2>
        <p className={styles.subtitle}>Here&apos;s your account overview</p>
      </div>

      <div className={styles.cardsGrid}>
        {/* Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle className={styles.cardTitle}>
              <User className={styles.icon} />
              Profile Information
            </CardTitle>
            <CardDescription>Your account details</CardDescription>
          </CardHeader>
          <CardContent className={styles.cardContent}>
            <div className={styles.infoItem}>
              <p className={styles.infoLabel}>Name</p>
              <p className={styles.infoValue}>{user?.name || 'N/A'}</p>
            </div>
            <div className={styles.infoItem}>
              <p className={styles.infoLabel}>Email</p>
              <p className={styles.infoValueEmail}>
                <Mail className={styles.mailIcon} />
                {user?.email || 'N/A'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Account Stats Card */}
        <Card>
          <CardHeader>
            <CardTitle className={styles.cardTitle}>
              <Calendar className={styles.icon} />
              Account Stats
            </CardTitle>
            <CardDescription>Your account timeline</CardDescription>
          </CardHeader>
          <CardContent className={styles.cardContent}>
            <div className={styles.infoItem}>
              <p className={styles.infoLabel}>Member Since</p>
              <p className={styles.infoValue}>
                {formatDate(user?.createdAt)}
              </p>
            </div>
            <div className={styles.infoItem}>
              <p className={styles.infoLabel}>Last Updated</p>
              <p className={styles.infoValue}>
                {formatDate(user?.updatedAt)}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats Card */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Your activity summary</CardDescription>
          </CardHeader>
          <CardContent className={styles.cardContent}>
            <div className={styles.statRow}>
              <span className={styles.statLabel}>Account Status</span>
              <span className={styles.badge}>Active</span>
            </div>
            <div className={styles.statRow}>
              <span className={styles.statLabel}>User ID</span>
              <span className={styles.statValue}>#{user?.id}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Welcome Message */}
      <Card className={styles.welcomeCard}>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>Welcome to your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <p className={styles.welcomeText}>
            This is a simple authentication demo application built with React, Redux Toolkit, 
            Express.js, MongoDB, and Redis. You can explore the features and see how 
            everything works together.
          </p>
          <div className={styles.featuresBox}>
            <h4 className={styles.featuresTitle}>Features included:</h4>
            <ul className={styles.featuresList}>
              <li>JWT-based authentication with access and refresh tokens</li>
              <li>Secure password hashing with bcrypt</li>
              <li>Redis for token storage</li>
              <li>MongoDB database</li>
              <li>React Hook Form with Zod validation</li>
              <li>Redux Toolkit for state management</li>
              <li>Tailwind CSS & ShadCN UI components</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default HomePage

