import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import AuthLayout from '../../layouts/AuthLayout'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import FormField from '../../components/forms/FormField'
import { Alert, AlertDescription } from '../../components/ui/Alert'
import { AlertCircle } from 'lucide-react'
import styles from './styles.module.css'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

const LoginPage = () => {
  const navigate = useNavigate()
  const { login, loading, error, clearError } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  })

  useEffect(() => {
    // Clear error khi unmount
    return () => {
      clearError()
    }
  }, [clearError])

  const onSubmit = async (data) => {
    const result = await login(data)
    
    if (result.success) {
      navigate('/dashboard')
    }
  }

  return (
    <AuthLayout>
      <Card>
        <CardHeader className={styles.header}>
          <CardTitle className={styles.title}>
            Sign in to your account
          </CardTitle>
          <CardDescription className={styles.description}>
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <FormField
              label="Email"
              id="email"
              type="email"
              placeholder="m@example.com"
              error={errors.email?.message}
              {...register('email')}
            />

            <FormField
              label="Password"
              id="password"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register('password')}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
              data-testid="login-btn"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className={styles.footer}>
          <div className={styles.footerText}>
            Don&apos;t have an account?{' '}
            <Link to="/signup" className={styles.link}>
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </AuthLayout>
  )
}

export default LoginPage
