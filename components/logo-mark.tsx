"use client"

import { motion } from "framer-motion"

export function LogoMark({ className }: { className?: string }) {
  return (
    <div className={className}>
      <motion.div
        className="relative flex size-9 items-center justify-center"
        animate={{ rotateY: 360 }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          aria-hidden="true"
          className="absolute size-8 rounded-md bg-gradient-to-br from-neon-cyan to-neon-purple opacity-70 blur-md"
        />
        <svg
          viewBox="0 0 24 24"
          className="relative z-10 size-8"
          role="img"
          aria-label="Devine Tech logo"
        >
          <title>Devine Tech logo</title>
          <path
            d="M12 2 L21 6.5 L21 17.5 L12 22 L3 17.5 L3 6.5 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            className="text-foreground/70"
          />
          <path
            d="M12 2 L12 22 M3 6.5 L21 17.5 M21 6.5 L3 17.5"
            stroke="currentColor"
            strokeWidth="0.6"
            className="text-foreground/30"
          />
          <circle cx="12" cy="12" r="3" className="fill-neon-cyan" />
        </svg>
      </motion.div>
    </div>
  )
}
