'use client'

import { useState, useEffect, useCallback } from "react"
import { timezone } from "@data/timezone"

export default function Click({
  className
}: {
  className?: string
}) {
  const [time, setTime] = useState('00:00:00')
  const timeZone = timezone[0]

  const refreshClock = useCallback(() => {
    const browserTime = new Date()
    setTime(browserTime.toLocaleTimeString('en-GB', { timeZone }))
  }, [setTime])

  useEffect(() => {
    const timer = setInterval(refreshClock, 1000)
    return () => clearInterval(timer)
  }, [refreshClock])

  return (
    <span className={className}>{time}</span>
  )
}
