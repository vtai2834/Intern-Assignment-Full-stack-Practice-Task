import { LogOut, Settings, PiggyBank, Keyboard } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/Button"
import styles from "./user-menu.module.css"

interface UserMenuProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function UserMenu({ open, onOpenChange }: UserMenuProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={styles.dialogContent}>
        <DialogHeader>
          <DialogTitle className={styles.header}>
            <div className={styles.avatar}>T</div>
            <div>
              <div className={styles.userName}>Tài Phan</div>
              <div className={styles.userEmail}>taithang2004@gmail.com</div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className={styles.divider}></div>

        <div className={styles.menuList}>
          <button className={styles.menuItem}>
            <Settings size={16} />
            <div className={styles.menuItemContent}>
              <span>Profile</span>
              <span className={styles.shortcut}>⌘P</span>
            </div>
          </button>

          <button className={styles.menuItem}>
            <PiggyBank size={16} />
            <div className={styles.menuItemContent}>
              <span>Billing</span>
              <span className={styles.shortcut}>⌘B</span>
            </div>
          </button>

          <button className={styles.menuItem}>
            <Keyboard size={16} />
            <div className={styles.menuItemContent}>
              <span>Command Menu</span>
              <span className={styles.shortcut}>⌘K</span>
            </div>
          </button>

          <button className={styles.menuItem}>
            <div className={styles.themeIcons}>
              <span>☐</span> / <span>☀️</span> / <span>🌙</span>
            </div>
            <span>Theme</span>
          </button>
        </div>

        <div className={styles.divider}></div>

        <Button variant="ghost" className={styles.signOutButton} onClick={() => onOpenChange(false)}>
          <LogOut size={16} />
          <span>Sign out</span>
          <span className={styles.shortcut}>⌘S</span>
        </Button>
      </DialogContent>
    </Dialog>
  )
}
