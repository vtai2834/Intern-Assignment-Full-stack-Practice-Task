import { useState, useEffect } from "react"

type Theme = "system" | "light" | "dark"

const getSystemTheme = () => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

const applyThemeClass = (isDark: boolean) => {
  const html = document.documentElement
  if (isDark) {
    html.classList.add("dark")
  } else {
    html.classList.remove("dark")
  }
}

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("theme") as Theme | null
    return saved && ["system", "light", "dark"].includes(saved) ? saved : "system"
  })

  // Apply theme on mount and when theme changes
  useEffect(() => {
    const isDark = theme === "system" ? getSystemTheme() === "dark" : theme === "dark"
    applyThemeClass(isDark)
    localStorage.setItem("theme", theme)
  }, [theme])

  // Listen for system theme changes when in system mode
  useEffect(() => {
    if (theme !== "system") return
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = (e: MediaQueryListEvent) => applyThemeClass(e.matches)
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [theme])

  return { theme, setTheme }
}

