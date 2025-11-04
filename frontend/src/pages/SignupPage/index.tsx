import { useEffect, useState, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, User, Mail, Lock, XCircle, CheckCircle } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Label } from '../../components/ui/Label'
import { Alert, AlertDescription } from '../../components/ui/Alert'
import { AlertCircle } from 'lucide-react'
import ThemeToggle from '../../layouts/Theme/theme_toggle'
import SocialButtons from '../../components/socialButtons'
import './signup_page.css'

const signupSchema = z.object({
  name: z.string().min(1, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

type SignupFormData = z.infer<typeof signupSchema>

const SignupPage = () => {
  const navigate = useNavigate()
  const { signup, loading, error, clearError } = useAuth()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  })

  const password = watch('password') || ''

  // Check password requirements (theo thứ tự ưu tiên) - memoize để tránh re-render
  const passwordRequirement = useMemo(() => {
    if (!password || password.length === 0) {
      return { text: '8 or more characters', met: false }
    }

    // 1. Check length (8 or more characters) - ưu tiên 1
    if (password.length < 8) {
      return { text: '8 or more characters', met: false }
    }

    // 2. Check uppercase and lowercase letters - ưu tiên 2
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    if (!hasUpperCase || !hasLowerCase) {
      return { text: 'Uppercase and lowercase letters', met: false }
    }

    // 3. Check at least one number - ưu tiên 3
    const hasNumber = /[0-9]/.test(password)
    if (!hasNumber) {
      return { text: 'At least one number', met: false }
    }

    // 4. All requirements met
    return { text: 'All requirements met.', met: true }
  }, [password])

  useEffect(() => {
    return () => {
      clearError()
    }
  }, [clearError])

  const onSubmit = async (data: SignupFormData) => {
    const result = await signup(data)
    
    if (result.success) {
      reset()
      setTimeout(() => {
        navigate('/login')
      }, 1500)
    }
  }

  return (
    <div className="signup-container">
      {/* Logo */}
      <div className="signup-logoContainer">
        <div className="signup-logo">A</div>
        <span className="signup-logoText">Acme</span>
      </div>

      {/* Signup Card */}
      <Card className="signup-card">
        <CardHeader className="signup-cardHeader">
          <CardTitle className="signup-title">Create your account</CardTitle>
          <CardDescription className="signup-description">
            Please fill in the details to get started.
          </CardDescription>
        </CardHeader>

        <CardContent className="signup-cardContent">
          <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
            {/* Error Alert */}
            {error && (
              <Alert variant="destructive" className="signup-errorAlert">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Name Field */}
            <div className="signup-formGroup">
              <Label htmlFor="name" className="signup-label">
                Name
              </Label>
              <div className="signup-inputWrapper">
                <User className="signup-leftIcon" />
                <Input
                  id="name"
                  type="text"
                  className="signup-input"
                  {...register('name')}
                />
              </div>
              {errors.name && (
                <p className="text-sm font-medium text-destructive">{errors.name.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="signup-formGroup">
              <Label htmlFor="email" className="signup-label">
                Email
              </Label>
              <div className="signup-inputWrapper">
                <Mail className="signup-leftIcon" />
                <Input
                  id="email"
                  type="email"
                  className="signup-input"
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="text-sm font-medium text-destructive">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="signup-formGroup">
              <Label htmlFor="password" className="signup-label">
                Password
              </Label>
              <div className="signup-inputWrapper">
                <Lock className="signup-leftIcon" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="signup-input"
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="signup-eyeButton"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff className="signup-eyeIcon" />
                  ) : (
                    <Eye className="signup-eyeIcon" />
                  )}
                </button>
              </div>
              {/* Password Requirement */}
              <div className={`signup-passwordRequirement ${passwordRequirement.met ? 'signup-requirementMet' : ''}`}>
                {passwordRequirement.met ? (
                  <CheckCircle className="signup-requirementIcon" size={14} />
                ) : (
                  <XCircle className="signup-requirementIcon" size={14} />
                )}
                <span className="signup-requirementText">{passwordRequirement.text}</span>
              </div>
              {errors.password && (
                <p className="text-sm font-medium text-destructive">{errors.password.message}</p>
              )}
            </div>

            {/* Create Account Button */}
            <Button
              type="submit"
              className="signup-createButton"
              disabled={loading}
              data-testid="signup-btn"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </Button>
          </form>

          {/* Divider */}
          <div className="signup-divider">
            <span className="signup-dividerText">Or continue with</span>
          </div>

          {/* Social Buttons */}
          <SocialButtons />
        </CardContent>

        <CardFooter className="signup-cardFooter">
          <p className="signup-signInText">
            Already have an account?{' '}
            <button 
              onClick={() => navigate('/login')} 
              className="signup-signInLink"
            >
              Sign in
            </button>
          </p>
        </CardFooter>
      </Card>

      {/* Footer Links */}
      <div className="signup-footerLinks">
        <p className="signup-footerText">
          By signing up, you agree to our{' '}
          <a href="#" className="signup-footerLink">
            Terms of Use
          </a>{' '}
          and{' '}
          <a href="#" className="signup-footerLink">
            Privacy Policy
          </a>
          .<br />
          Need help?{' '}
          <a href="#" className="signup-footerLink">
            Get in touch
          </a>
        </p>
      </div>

      {/* Theme Toggle */}
      <ThemeToggle />
    </div>
  )
}

export default SignupPage
