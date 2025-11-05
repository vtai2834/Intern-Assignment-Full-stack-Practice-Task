import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Label } from '../../components/ui/Label'
import { Alert, AlertDescription } from '../../components/ui/Alert'
import { AlertCircle } from 'lucide-react'
import ThemeToggle from '../../layouts/Theme/theme_toggle'
import SocialButtons from '../../components/socialButtons'
import './login_page.css'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

type LoginFormData = z.infer<typeof loginSchema>

const LoginPage = () => {
  const navigate = useNavigate()
  const { login, loading, error, clearError } = useAuth()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  useEffect(() => {
    return () => {
      clearError()
    }
  }, [clearError])

  const onSubmit = async (data: LoginFormData) => {
    const result = await login(data)
    
    if (result.success) {
      navigate('/dashboard')
    }
  }

  return (
    <div className="login-container">
      {/* Logo */}
      <div className="login-logoContainer">
        <div className="login-logo">A</div>
        <span className="login-logoText">Acme</span>
      </div>

      {/* Login Card */}
      <Card className="login-card">
        <CardHeader className="login-cardHeader">
          <CardTitle className="login-title">Sign in to your account</CardTitle>
          <CardDescription className="login-description">
            Welcome back! Please sign in to continue.
          </CardDescription>
        </CardHeader>

        <CardContent className="login-cardContent">
          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            {/* Error Alert */}
            {error && (
              <Alert variant="destructive" className="login-errorAlert">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Email Field */}
            <div className="login-formGroup">
              <Label htmlFor="email" className="login-label">
                Email
              </Label>
              <div className="login-inputWrapper">
                <Mail className="login-leftIcon" />
                <Input
                  id="email"
                  type="email"
                  className="login-input"
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="text-sm font-medium text-destructive">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="login-formGroup">
              <div className="login-passwordHeader">
                <Label htmlFor="password" className="login-label">
                  Password
                </Label>
                <a href="#" className="login-forgotLink">
                  Forgot password?
                </a>
              </div>
              <div className="login-inputWrapper">
                <Lock className="login-leftIcon" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="login-input"
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="login-eyeButton"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff className="login-eyeIcon" />
                  ) : (
                    <Eye className="login-eyeIcon" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm font-medium text-destructive">{errors.password.message}</p>
              )}
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              className="login-signInButton"
              disabled={loading}
              data-testid="login-btn"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          {/* Divider */}
          <div className="login-divider">
            <span className="login-dividerText">Or continue with</span>
          </div>

          {/* Social Buttons */}
          <SocialButtons />
        </CardContent>

        <CardFooter className="login-cardFooter">
          <p className="login-signUpText">
            Don&apos;t have an account?{' '}
            <button 
              onClick={() => navigate('/signup')} 
              className="login-signUpLink"
            >
              Sign up
            </button>
          </p>
        </CardFooter>
      </Card>

      {/* Theme Toggle */}
      <ThemeToggle />
    </div>
  )
}

export default LoginPage
