"use client"

import * as React from "react"
import { useTheme } from "next-themes"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="px-3 py-1.5 border border-dashed rounded-sm bg-muted/20">
        <span className="jetbrains-mono text-[10px] tracking-tight text-muted-foreground">...</span>
      </div>
    )
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <button
      onClick={toggleTheme}
      className="group px-3 py-1.5 border border-dashed rounded-sm bg-muted/20 hover:bg-muted/30 transition-colors"
      aria-label="Toggle theme"
    >
      <span className="jetbrains-mono text-[10px] tracking-tight text-muted-foreground">
        [{theme === "dark" ? "DARK" : "LIGHT"}]
      </span>
    </button>
  )
}
