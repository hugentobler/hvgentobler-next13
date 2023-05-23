'use client'

import { useState, useEffect, useCallback } from 'react'
import { timezone } from '#/data/timezone'

// Due to fact that Next13 renders everything server-side first, we
// must brute force render the clock on client side only to prevent
// hydration error. Solution:
// https://www.joshwcomeau.com/react/the-perils-of-rehydration/

export default function ClockClientOnly({ ...props }) {
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => {
    setHasMounted(true)
  }, [])
  if (!hasMounted) {
    return null;
  }
  return (
    <Clock {...props} />
  )
}

const Clock = ({
  className
}: {
  className?: string
}) => {
  const timeZone = timezone[0]
  const [time, setTime] = useState(() => {
    const browserTime = new Date()
    return browserTime.toLocaleTimeString('en-GB', { timeZone })
  })
  const refreshClock = useCallback(() => {
    const browserTime = new Date()
    setTime(browserTime.toLocaleTimeString('en-GB', { timeZone }))
  }, [timeZone])
  useEffect(() => {
    const timer = setInterval(refreshClock, 1000)
    return () => clearInterval(timer)
  }, [refreshClock])
  return (
    <span className={className}>{time}</span>
  )
}
