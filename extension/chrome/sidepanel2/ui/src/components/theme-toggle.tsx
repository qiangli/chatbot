"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import useLocalStorage from "use-local-storage"
import { Button } from "./ui/button"
import { IconMoon, IconSun } from "./ui/icons"

export function ThemeToggle() {
  const defaultTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
  const [storedTheme, setStoredTheme] = useLocalStorage(
    "theme",
    defaultTheme ? "dark" : "light"
  )

  const { setTheme, theme } = useTheme()

  React.useEffect(() => {
    if (storedTheme) {
      setTheme(storedTheme)
    }
  }, [storedTheme, setTheme])

  const toggle = () => {
    React.startTransition(() => {
      const newTheme = theme === "light" ? "dark" : "light"
      setTheme(newTheme)
      setStoredTheme(newTheme)
    })
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggle}>
      {!theme ? null : theme === "dark" ? (
        <IconSun className="transition-all" />
      ) : (
        <IconMoon className="transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
