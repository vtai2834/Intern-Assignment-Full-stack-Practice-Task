import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "../../components/ui/Button"
import styles from "./theme_toggle.module.css"

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const isDarkMode = document.documentElement.classList.contains("dark")
    setIsDark(isDarkMode)
  }, [])

  const toggleTheme = () => {
    const html = document.documentElement
    const newDarkMode = !isDark

    if (newDarkMode) {
      html.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      html.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }

    setIsDark(newDarkMode)
  }

  if (!mounted) return null

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} className={styles.themeToggle} aria-label="Toggle theme">
      {isDark ? <Moon className={styles.icon} /> : <Sun className={styles.icon} />}
    </Button>
  )
}
