'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Clear any existing theme from localStorage for testing
    localStorage.removeItem('theme')

    // For testing, let's force light mode initially
    const initialTheme = 'light'
    console.log('Forcing initial theme to light mode')
    setTheme(initialTheme)

    // Initialize the theme class immediately
    const html = document.documentElement
    html.classList.remove('light', 'dark')
    html.classList.add(initialTheme)
    console.log('Initial classes applied:', html.className)
  }, [])

  // Apply theme changes to document when theme state changes
  useEffect(() => {
    if (!mounted) return

    const html = document.documentElement
    console.log('Theme changed to:', theme)

    if (theme === 'dark') {
      html.classList.remove('light')
      html.classList.add('dark')
      console.log('Applied dark theme, classes:', html.className)
    } else {
      html.classList.remove('dark')
      html.classList.add('light')
      console.log('Applied light theme, classes:', html.className)
    }
  }, [theme, mounted])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    console.log('Toggling theme from', theme, 'to', newTheme)
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <div>{children}</div>
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
