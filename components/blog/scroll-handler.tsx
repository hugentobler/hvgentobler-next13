'use client'

import { useEffect } from 'react'

export default function ScrollHandler() {
  useEffect(() => {
    // Get the scrollable event
    const article = document.querySelector('article')
    // Handle scroll events
    const handleWheel = (e: WheelEvent) => {
      // Some browsers scroll horizontally when shift key is held down
      if (!e.shiftKey && article) {
        e.preventDefault()
        article.scrollLeft += e.deltaY + e.deltaX
      }
    }

    // Handle window resize events
    const handleResize = () => {
      if (article) {
        // Determine computed css style, preserving responsiveness
        const overflowX = window.getComputedStyle(article).overflowX
        if (overflowX == 'scroll') {
          window.addEventListener('wheel', handleWheel, { passive: false })
        } else {
          window.removeEventListener('wheel', handleWheel)
        }
      }
    }

    handleResize() // Initial check

    window.addEventListener('resize', handleResize)

    // Cleanup effect
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('wheel', handleWheel)
    }
  }, [])

  return null
}
