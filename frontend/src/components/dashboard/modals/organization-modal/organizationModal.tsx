import { Search, Check, MoreHorizontal, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/Input"
import styles from "./organization-switcher.module.css"

interface OrganizationSwitcherProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function OrganizationSwitcher({ open, onOpenChange }: OrganizationSwitcherProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={styles.dialogContent}>
        <DialogHeader>
          <DialogTitle>Organizations</DialogTitle>
        </DialogHeader>

        <div className={styles.searchContainer}>
          <Input placeholder="Search..." className={styles.searchInput} prefix={<Search size={16} />} />
        </div>

        <div className={styles.list}>
          <div className={styles.orgItem}>
            <div className={styles.orgIcon}>v</div>
            <div className={styles.orgName}>vtai</div>
            <Check size={16} className={styles.checkmark} />
          </div>

          <div className={styles.divider}></div>

          <button className={styles.menuItem}>
            <MoreHorizontal size={16} />
            All organizations
          </button>
          <button className={styles.menuItem}>
            <span className={styles.settingsIcon}>⚙️</span>
            Account settings
          </button>
          <button className={styles.menuItem}>
            <span className={styles.settingsIcon}>⚙️</span>
            Organization settings
          </button>

          <div className={styles.divider}></div>

          <button className={styles.menuItem}>
            <Plus size={16} />
            Add organization
          </button>

          <div className={styles.divider}></div>

          <button className={styles.oauthButton}>
            <span className={styles.googleIcon}>G</span>
            Google
          </button>
          <button className={styles.oauthButton}>
            <span className={styles.microsoftIcon}>M</span>
            Microsoft
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
