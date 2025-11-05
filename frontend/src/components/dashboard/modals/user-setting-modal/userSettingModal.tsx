import { LogOut, Monitor, Sun, Moon } from "lucide-react"
import { PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/Button"
import "./userSettingModal.css"
import { useSidebar } from "@/components/ui/sidebar"
import { useAuth } from "@/hooks/useAuth"

interface UserMenuProps {
  onOpenChange: (open: boolean) => void
}

export default function UserMenu({ onOpenChange }: UserMenuProps) {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"
  const { logout } = useAuth()

  const handleSignOut = async () => {
    await logout()
    onOpenChange(false)
  }
  
  return (
    <PopoverContent 
      align={isCollapsed ? "start" : "end"} 
      side="top"
      className="popoverContent"
      sideOffset={8}
    >
      <div className="header">
        {/* <div className="avatar">T</div> */}
        <div>
          <div className="userName">Tài Phan</div>
          <div className="userEmail">satthupro2004@gmail.com</div>
        </div>
      </div>

      <div className="divider"></div>

      <div className="menuList">
        <button className="menuItem">
          {/* <Settings size={16} /> */}
          <div className="menuItemContent">
            <span>Profile</span>
            <span className="shortcut">⇧⌘P</span>
          </div>
        </button>

        <button className="menuItem">
          {/* <PiggyBank size={16} /> */}
          <div className="menuItemContent">
            <span>Billing</span>
            <span className="shortcut">⇧⌘B</span>
          </div>
        </button>

        <button className="menuItem">
          {/* <Keyboard size={16} /> */}
          <div className="menuItemContent">
            <span>Command Menu</span>
            <span className="shortcut">⌘K</span>
          </div>
        </button>

        <button className="menuItem">
          <div className="menuItemContent">
            <span>Theme</span>
            <div className="shortcut themeIcons">
              <Monitor size={16} />
              <Sun size={16} />
              <Moon size={16} />
            </div>
          </div>
        </button>
      </div>

      <div className="divider"></div>

      <Button variant="ghost" className="signOutButton" onClick={handleSignOut}>
        <LogOut size={16} />
        <span>Sign out</span>
        <span className="shortcut">⇧⌘S</span>
      </Button>
    </PopoverContent>
  )
}
