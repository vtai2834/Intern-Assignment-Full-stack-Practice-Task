import React from 'react'
import { Label } from '../../ui/Label'
import { Input, InputProps } from '../../ui/Input'
import { cn } from '../../../lib/utils'
import './formField.css'

interface FormFieldProps extends InputProps {
  label?: string
  error?: string
}

const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className={cn("container", className)}>
        {label && <Label htmlFor={props.id}>{label}</Label>}
        <Input ref={ref} {...props} />
        {error && (
          <p className="error">{error}</p>
        )}
      </div>
    )
  }
)

FormField.displayName = "FormField"

export default FormField

