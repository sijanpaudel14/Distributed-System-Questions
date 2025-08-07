'use client'

import React, { useState } from 'react'
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

  const handleSelection = (callback: () => void) => {
    callback()
    setIsOpen(false)
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className='lg:hidden fixed top-4 left-4 z-50'>
        <button
          onClick={() => setIsOpen(true)}
          className='bg-white p-2 rounded-md shadow-lg border border-gray-200 hover:bg-gray-50'
        >
          <Bars3Icon className='h-6 w-6 text-gray-600' />
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div className='lg:hidden fixed inset-0 z-40 flex'>
          {/* Backdrop */}
          <div
            className='fixed inset-0 bg-black bg-opacity-50'
            onClick={() => setIsOpen(false)}
          />

          {/* Sidebar */}
          <div className='relative flex-shrink-0 w-80 bg-white'>
            {/* Close button */}
            <div className='absolute top-4 right-4'>
              <button
                onClick={() => setIsOpen(false)}
                className='p-2 rounded-md hover:bg-gray-100'
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
