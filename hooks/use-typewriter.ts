"use client"

import * as React from "react"

export function useTypewriter(text: string, speed = 35, startDelay = 300) {
  const [output, setOutput] = React.useState("")
  const [done, setDone] = React.useState(false)

  React.useEffect(() => {
    let index = 0
    let interval: ReturnType<typeof setInterval>
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        index += 1
        setOutput(text.slice(0, index))
        if (index >= text.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, speed)
    }, startDelay)

    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [text, speed, startDelay])

  return { output, done }
}
