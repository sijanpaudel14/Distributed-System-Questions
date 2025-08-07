'use client'

import React, { useState, useEffect } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Sidebar from './Sidebar'
import { Unit } from '@/types'

interface MobileNavigationProps {
  syllabus: Unit[]
  selectedUnit: number | null
  selectedChapter: number | null
  selectedSubchapter: string | null
  onUnitSelect: (unit: number) => void
  onChapterSelect: (unit: number, chapter: number) => void
  onSubchapterSelect: (
    unit: number,
    chapter: number,
    subchapter: string
  ) => void
  onViewAll: () => void
}

const MobileNavigation: React.FC<MobileNavigationProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false)

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleSelection = (callback: () => void) => {
    callback()
    setIsOpen(false)
  }

  return (
    <>
      {/* Mobile menu button - positioned properly with good touch target */}
      <div className='lg:hidden fixed top-4 left-4 z-50'>
        <button
          onClick={() => setIsOpen(true)}
          className='bg-white p-3 rounded-lg shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors active:scale-95'
          aria-label='Open navigation menu'
        >
          <Bars3Icon className='h-6 w-6 text-gray-600' />
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div className='lg:hidden fixed inset-0 z-50 flex'>
          {/* Transparent backdrop - allows content to show through */}
          <div
            className='absolute inset-0 bg-transparent transition-opacity'
            onClick={() => setIsOpen(false)}
          />

          {/* Sidebar */}
          <div className='relative flex-shrink-0 w-full max-w-xs sm:w-80 bg-white transform transition-transform z-10 shadow-xl'>
            {/* Close button */}
            <div className='absolute top-4 right-4 z-10'>
              <button
                onClick={() => setIsOpen(false)}
                className='p-2 rounded-md hover:bg-gray-100 transition-colors'
                aria-label='Close navigation menu'
              >
                <XMarkIcon className='h-5 w-5 text-gray-500' />
              </button>
            </div>

            <Sidebar
              {...props}
              onUnitSelect={(unit) =>
                handleSelection(() => props.onUnitSelect(unit))
              }
              onChapterSelect={(unit, chapter) =>
                handleSelection(() => props.onChapterSelect(unit, chapter))
              }
              onSubchapterSelect={(unit, chapter, subchapter) =>
                handleSelection(() =>
                  props.onSubchapterSelect(unit, chapter, subchapter)
                )
              }
              onViewAll={() => handleSelection(props.onViewAll)}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default MobileNavigation
