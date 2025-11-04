import { Label } from '../../ui/Label'
import { Input } from '../../ui/Input'
import { cn } from '../../../lib/utils'
import styles from './styles.module.css'

const FormField = ({ label, error, className, ...props }) => {
  return (
    <div className={cn(styles.container, className)}>
      {label && <Label htmlFor={props.id}>{label}</Label>}
      <Input {...props} />
      {error && (
        <p className={styles.error}>{error}</p>
      )}
    </div>
  )
}

export default FormField

