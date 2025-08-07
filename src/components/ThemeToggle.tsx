'use client'

import React from 'react'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import { useTheme } from '@/contexts/ThemeContext'

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className='flex items-center justify-center p-2 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm hover:shadow-md'
      title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    >
      {theme === 'light' ? (
        <MoonIcon className='h-4 w-4 text-gray-700 dark:text-gray-300' />
      ) : (
        <SunIcon className='h-4 w-4 text-yellow-500' />
      )}
    </button>
  )
}

export default ThemeToggle
