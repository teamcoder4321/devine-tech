"use client"

import { motion } from "framer-motion"

export function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <motion.div
        className="absolute -left-40 top-[-12rem] size-[32rem] rounded-full bg-neon-cyan/10 blur-[110px]"
        animate={{ x: [0, 80, -20, 0], y: [0, 60, 120, 0], scale: [1, 1.12, 0.94, 1] }}
        transition={{ duration: 24, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-48 top-1/3 size-[36rem] rounded-full bg-neon-purple/10 blur-[125px]"
        animate={{ x: [0, -90, 20, 0], y: [0, -70, 80, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 28, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute bottom-[-16rem] left-1/3 size-[30rem] rounded-full bg-neon-cyan/5 blur-[120px]"
        animate={{ x: [0, 100, -60, 0], scale: [1, 1.08, 0.96, 1] }}
        transition={{ duration: 32, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 5 }}
      />
    </div>
  )
}
