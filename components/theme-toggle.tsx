'use client'

import { useEffect, useState, useCallback } from 'react'
import { themeEffect } from './theme-effect'
import DecoratedLink from './decorated-link'

// we could store user preferences across sessions
// but in this version, we don't, every session starts with client preference

export function ThemeToggle() {
  // color scheme preference, user or system
  const [preference, setPreference] = useState<undefined | null | string>(
    null
  )
  // color scheme to show
  const [currentTheme, setCurrentTheme] = useState<null | string>(null)

  // when device preference changes, handle update theme
  const onMediaChange = useCallback(() => {
    setCurrentTheme(themeEffect())
  }, [])

  useEffect(() => {
    // on load, check if there's stored preference, reset preference
    localStorage.removeItem('theme')
    setPreference(localStorage.getItem('theme'))
    // check the loaded theme, set theme
    setCurrentTheme(themeEffect())
    // set and cleanup listener on device preferred color scheme
    const matchMedia = window.matchMedia('(prefers-color-scheme: dark)')
    matchMedia.addEventListener('change', onMediaChange)
    return () => matchMedia.removeEventListener('change', onMediaChange)
    // when device preference changes, update all
  }, [onMediaChange])

  // user preference is stored and read from localStorage
  // when localStorage is updated, update preference state
  const onStorageChange = useCallback(
    (event: StorageEvent) => {
      console.log(event)
      if (event.key === 'theme') setPreference(event.newValue)
    },
    [setPreference]
  )
  // whenever device preference changes, update theme
  useEffect(() => {
    console.log('preference changed')
    setCurrentTheme(themeEffect())
  }, [preference])

  useEffect(() => {
    window.addEventListener('storage', onStorageChange)
    return () => window.removeEventListener('storage', onStorageChange)
  })

  return (
    <DecoratedLink
      href="#"
      onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault()
        const newPreference: string | null =
          currentTheme === 'dark' ? 'light' : 'dark'
        localStorage.setItem('theme', newPreference)
        setPreference(newPreference)
      }}
    >
      {currentTheme === 'dark' ? 'Light' : 'Dark'}
    </DecoratedLink>
  )
}
