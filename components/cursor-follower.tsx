"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function CursorFollower() {
  const [enabled, setEnabled] = React.useState(false)
  const [pointerVariant, setPointerVariant] = React.useState<"default" | "link" | "card">("default")
  const [pressed, setPressed] = React.useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 500, damping: 34, mass: 0.25 })
  const springY = useSpring(y, { stiffness: 500, damping: 34, mass: 0.25 })
  const trailX = useSpring(x, { stiffness: 180, damping: 24, mass: 0.5 })
  const trailY = useSpring(y, { stiffness: 180, damping: 24, mass: 0.5 })

  React.useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    setEnabled(canHover && !reducedMotion)
    if (!canHover || reducedMotion) return

    document.body.classList.add("custom-cursor-active")

    function handleMove(e: PointerEvent) {
      x.set(e.clientX)
      y.set(e.clientY)
      const target = e.target as HTMLElement
      if (target.closest("[data-cursor='card']")) {
        setPointerVariant("card")
      } else if (target.closest("a, button, [role='button'], input, textarea")) {
        setPointerVariant("link")
      } else {
        setPointerVariant("default")
      }
    }

    function handleDown() {
      setPressed(true)
    }

    function handleUp() {
      setPressed(false)
    }

    function handleLeave() {
      x.set(-100)
      y.set(-100)
    }

    window.addEventListener("pointermove", handleMove)
    window.addEventListener("pointerdown", handleDown)
    window.addEventListener("pointerup", handleUp)
    window.addEventListener("blur", handleLeave)
    return () => {
      window.removeEventListener("pointermove", handleMove)
      window.removeEventListener("pointerdown", handleDown)
      window.removeEventListener("pointerup", handleUp)
      window.removeEventListener("blur", handleLeave)
      document.body.classList.remove("custom-cursor-active")
    }
  }, [x, y, trailX, trailY])

  if (!enabled) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] mix-blend-difference" aria-hidden="true">
      <motion.div
        className="fixed left-0 top-0 rounded-full border border-white/50"
        style={{ x: trailX, y: trailY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: pointerVariant === "card" ? 64 : pointerVariant === "link" ? 42 : 30,
          height: pointerVariant === "card" ? 64 : pointerVariant === "link" ? 42 : 30,
          opacity: pressed ? 0.35 : 0.7,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      />
      <motion.div
        className="fixed left-0 top-0 size-2 rounded-full bg-white"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: pressed ? 2 : pointerVariant === "link" ? 1.5 : 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
      />
    </div>
  )
}
