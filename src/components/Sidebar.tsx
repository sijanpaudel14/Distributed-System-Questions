'use client'

import React, { useState } from 'react'
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { Unit } from '@/types'

interface SidebarProps {
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

const Sidebar: React.FC<SidebarProps> = ({
  syllabus,
  selectedUnit,
  selectedChapter,
  selectedSubchapter,
  onUnitSelect,
  onChapterSelect,
  onSubchapterSelect,
  onViewAll,
}) => {
  const [expandedUnits, setExpandedUnits] = useState<Set<number>>(new Set())
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(
    new Set()
  )
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleUnit = (unitNumber: number) => {
    const newExpanded = new Set(expandedUnits)
    if (newExpanded.has(unitNumber)) {
      newExpanded.delete(unitNumber)
    } else {
      newExpanded.add(unitNumber)
    }
    setExpandedUnits(newExpanded)
  }

  const toggleChapter = (unitNumber: number, chapterNumber: number) => {
    const key = `${unitNumber}-${chapterNumber}`
    const newExpanded = new Set(expandedChapters)
    if (newExpanded.has(key)) {
      newExpanded.delete(key)
    } else {
      newExpanded.add(key)
    }
    setExpandedChapters(newExpanded)
  }

  return (
    <div
      className={`bg-white border-r border-gray-200 h-screen overflow-y-auto transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-full lg:w-80'
      }`}
    >
      {/* Header with Collapse/Expand Button - Hidden on mobile */}
      <div className='p-3 sm:p-4 border-b border-gray-200 hidden lg:block'>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className='group relative cursor-pointer w-full flex items-center justify-center p-2 sm:p-3 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300 transition-all duration-200 active:scale-95'
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? (
            <div className='w-5 h-5 flex items-center justify-center'>
              <svg
                className='w-4 h-4 text-gray-600 group-hover:text-gray-800 transition-colors duration-200'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            </div>
          ) : (
            <div className='flex items-center space-x-2'>
              <div className='w-5 h-5 flex items-center justify-center rounded-md bg-white border border-gray-200 group-hover:border-gray-300 group-hover:shadow-sm transition-all duration-200'>
                <svg
                  className='w-3 h-3 text-gray-600 group-hover:text-gray-800 transition-colors duration-200'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2.5}
                    d='M15 19l-7-7 7-7'
                  />
                </svg>
              </div>
              <span className='text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200'>
                Hide
              </span>
            </div>
          )}
        </button>
      </div>

      {/* Mobile header - only visible on mobile when not collapsed */}
      <div className='p-3 sm:p-4 border-b border-gray-200 block lg:hidden'>
        <div className='text-center'>
          <h2 className='text-lg font-bold text-gray-900 mb-2'>
            Course Structure
          </h2>
          <div className='w-12 h-0.5 bg-blue-500 rounded-full mx-auto'></div>
        </div>
      </div>

      {/* Main content */}
      {!isCollapsed && (
        <div className='p-3 sm:p-6 lg:p-6'>
          {/* Desktop header - only visible on desktop */}
          <div className='mb-4 sm:mb-6 text-center hidden lg:block'>
            <h2 className='text-lg sm:text-xl font-bold text-gray-900 mb-2'>
              Course Structure
            </h2>
            <div className='w-12 sm:w-16 h-0.5 bg-blue-500 rounded-full mx-auto'></div>
          </div>

          {/* View All Button */}
          <button
            onClick={onViewAll}
            className={`w-full text-left p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 transition-all duration-200 font-medium ${
              selectedUnit === null
                ? 'bg-blue-500 text-white shadow-sm'
                : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200'
            }`}
          >
            <div className='flex items-center'>
              <span className='text-base sm:text-lg mr-2 sm:mr-3'>📚</span>
              <span className='text-sm sm:text-base'>All Questions</span>
            </div>
          </button>

          {/* Units */}
          {syllabus.map((unit) => (
            <div key={unit.unit} className='mb-3'>
              {/* Unit Header */}
              <div
                className={`flex items-center justify-between p-3 sm:p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedUnit === unit.unit && selectedChapter === null
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200'
                }`}
              >
                <div
                  className='flex items-center flex-1'
                  onClick={() => onUnitSelect(unit.unit)}
                >
                  <span className='text-xs sm:text-sm mr-2 sm:mr-3'>
                    {selectedUnit === unit.unit && selectedChapter === null
                      ? '●'
                      : '○'}
                  </span>
                  <span className='font-medium text-xs sm:text-sm'>
                    Unit {unit.unit}: {unit.title}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleUnit(unit.unit)
                  }}
                  className='p-1 hover:bg-gray-200 hover:bg-opacity-50 rounded transition-colors duration-200'
                >
                  {expandedUnits.has(unit.unit) ? (
                    <ChevronDownIcon className='h-3 w-3 sm:h-4 sm:w-4' />
                  ) : (
                    <ChevronRightIcon className='h-3 w-3 sm:h-4 sm:w-4' />
                  )}
                </button>
              </div>

              {/* Chapters */}
              {expandedUnits.has(unit.unit) && (
                <div className='ml-6 mt-3 space-y-2'>
                  {unit.chapters.map((chapter) => (
                    <div key={chapter.chapter}>
                      {/* Chapter Header */}
                      <div
                        className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                          selectedUnit === unit.unit &&
                          selectedChapter === chapter.chapter &&
                          !selectedSubchapter
                            ? 'bg-green-500 text-white shadow-sm'
                            : 'bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-100'
                        }`}
                      >
                        <div
                          className='flex items-center flex-1'
                          onClick={() =>
                            onChapterSelect(unit.unit, chapter.chapter)
                          }
                        >
                          <span className='text-xs mr-2'>
                            {selectedUnit === unit.unit &&
                            selectedChapter === chapter.chapter &&
                            !selectedSubchapter
                              ? '●'
                              : '○'}
                          </span>
                          <span className='text-sm font-medium'>
                            {chapter.chapter}: {chapter.title}
                          </span>
                        </div>
                        {chapter.subchapters && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleChapter(unit.unit, chapter.chapter)
                            }}
                            className='p-1 hover:bg-gray-200 hover:bg-opacity-50 rounded transition-colors duration-200'
                          >
                            {expandedChapters.has(
                              `${unit.unit}-${chapter.chapter}`
                            ) ? (
                              <ChevronDownIcon className='h-3 w-3' />
                            ) : (
                              <ChevronRightIcon className='h-3 w-3' />
                            )}
                          </button>
                        )}
                      </div>

                      {/* Subchapters */}
                      {chapter.subchapters &&
                        expandedChapters.has(
                          `${unit.unit}-${chapter.chapter}`
                        ) && (
                          <div className='ml-6 mt-2 space-y-1'>
                            {chapter.subchapters.map((subchapter) => (
                              <div
                                key={subchapter.subchapter}
                                className={`p-3 rounded-lg cursor-pointer transition-all duration-200 text-sm ${
                                  selectedUnit === unit.unit &&
                                  selectedChapter === chapter.chapter &&
                                  selectedSubchapter === subchapter.subchapter
                                    ? 'bg-orange-500 text-white shadow-sm'
                                    : 'bg-gray-50 hover:bg-gray-100 text-gray-500 border border-gray-100'
                                }`}
                                onClick={() =>
                                  onSubchapterSelect(
                                    unit.unit,
                                    chapter.chapter,
                                    subchapter.subchapter
                                  )
                                }
                              >
                                <div className='flex items-center'>
                                  <span className='text-xs mr-2'>
                                    {selectedUnit === unit.unit &&
                                    selectedChapter === chapter.chapter &&
                                    selectedSubchapter === subchapter.subchapter
                                      ? '●'
                                      : '○'}
                                  </span>
                                  <span>
                                    {subchapter.subchapter}: {subchapter.title}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Sidebar
