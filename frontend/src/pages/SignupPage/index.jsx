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

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

const SignupPage = () => {
  const navigate = useNavigate()
  const { signup, loading, error, clearError } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(signupSchema),
  })

  useEffect(() => {
    // Clear error khi unmount
    return () => {
      clearError()
    }
  }, [clearError])

  const onSubmit = async (data) => {
    const { confirmPassword, ...signupData } = data
    const result = await signup(signupData)
    
    if (result.success) {
      reset()
      // Hiển thị success message (có thể dùng toast)
      setTimeout(() => {
        navigate('/login')
      }, 1500)
    }
  }

  return (
    <AuthLayout>
      <Card>
        <CardHeader className={styles.header}>
          <CardTitle className={styles.title}>
            Create an account
          </CardTitle>
          <CardDescription className={styles.description}>
            Enter your information to create your account
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
              label="Name"
              id="name"
              type="text"
              placeholder="John Doe"
              error={errors.name?.message}
              {...register('name')}
            />

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

            <FormField
              label="Confirm Password"
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
              data-testid="signup-btn"
            >
              {loading ? 'Creating account...' : 'Sign up'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className={styles.footer}>
          <div className={styles.footerText}>
            Already have an account?{' '}
            <Link to="/login" className={styles.link}>
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </AuthLayout>
  )
}

export default SignupPage
