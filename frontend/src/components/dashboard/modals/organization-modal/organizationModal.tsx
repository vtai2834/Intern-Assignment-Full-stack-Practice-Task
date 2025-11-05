import { Search, Check, MoreHorizontal, Plus, Settings, User } from "lucide-react"
import { PopoverContent } from "@/components/ui/popover"
import { Input } from "@/components/ui/Input"
import { useSidebar } from "@/components/ui/sidebar"
import "./organizationModal.css"

export default function OrganizationSwitcher() {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <PopoverContent
      align={isCollapsed ? "start" : "end"}
      side="top"
      className="popoverContent"
      sideOffset={8}
    >
      <div className="searchContainer">
        <div className="searchWrapper">
          <Search size={16} className="searchIcon" />
          <Input placeholder="Search..." className="searchInput" />
        </div>
      </div>

      <div className="list">
        <div className="orgItem">
          <div className="orgIcon">v</div>
          <div className="orgName">vtai</div>
          <Check size={16} className="checkmark" />
        </div>

        <button className="menuItem">
          <MoreHorizontal size={16} />
          All organizations
        </button>
      </div>

      <div className="divider"></div>

      <div className="list">
        <button className="menuItem">
          <User size={16} />
          Account settings
        </button>
        <button className="menuItem">
          <Settings size={16} />
          Organization settings
        </button>
        <button className="menuItem">
          <Plus size={16} />
          Add organization
        </button>
      </div>

      <div className="divider"></div>

    </PopoverContent>
  )
}
