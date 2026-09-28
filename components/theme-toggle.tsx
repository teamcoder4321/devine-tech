"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted ? resolvedTheme === "dark" : true

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle dark mode"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative flex h-8 w-14 shrink-0 items-center rounded-full border border-border bg-secondary/80 px-1 transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        className
      )}
    >
      <span className="sr-only">Toggle dark mode</span>
      <Sun className="absolute left-1.5 size-3.5 text-muted-foreground" aria-hidden />
      <Moon className="absolute right-1.5 size-3.5 text-muted-foreground" aria-hidden />
      <motion.span
        className="relative z-10 flex size-6 items-center justify-center rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple shadow-md"
        animate={{ x: isDark ? 22 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {isDark ? (
          <Moon className="size-3.5 text-background" aria-hidden />
        ) : (
          <Sun className="size-3.5 text-background" aria-hidden />
        )}
      </motion.span>
    </button>
  )
}
