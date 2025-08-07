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
        isCollapsed ? 'w-16' : 'w-80'
      }`}
    >
      {/* Header with Collapse/Expand Button */}
      <div className='p-4 border-b border-gray-200'>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className='group relative cursor-pointer w-full flex items-center justify-center p-3 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300 transition-all duration-200 active:scale-95'
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

      {!isCollapsed && (
        <div className='p-6'>
          <div className='mb-6 text-center'>
            <h2 className='text-xl font-bold text-gray-900 mb-2'>
              Course Structure
            </h2>
            <div className='w-16 h-0.5 bg-blue-500 rounded-full mx-auto'></div>
          </div>

          {/* View All Button */}
          <button
            onClick={onViewAll}
            className={`w-full text-left p-4 rounded-lg mb-6 transition-all duration-200 font-medium ${
              selectedUnit === null
                ? 'bg-blue-500 text-white shadow-sm'
                : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200'
            }`}
          >
            <div className='flex items-center'>
              <span className='text-lg mr-3'>📚</span>
              <span>All Questions</span>
            </div>
          </button>

          {/* Units */}
          {syllabus.map((unit) => (
            <div key={unit.unit} className='mb-3'>
              {/* Unit Header */}
              <div
                className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedUnit === unit.unit && selectedChapter === null
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200'
                }`}
                onClick={() => {
                  onUnitSelect(unit.unit)
                  toggleUnit(unit.unit)
                }}
              >
                <div className='flex items-center'>
                  <span className='text-sm mr-3'>
                    {selectedUnit === unit.unit && selectedChapter === null
                      ? '●'
                      : '○'}
                  </span>
                  <span className='font-medium text-sm'>
                    Unit {unit.unit}: {unit.title}
                  </span>
                </div>
                {expandedUnits.has(unit.unit) ? (
                  <ChevronDownIcon className='h-4 w-4' />
                ) : (
                  <ChevronRightIcon className='h-4 w-4' />
                )}
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
                        onClick={() => {
                          onChapterSelect(unit.unit, chapter.chapter)
                          if (chapter.subchapters) {
                            toggleChapter(unit.unit, chapter.chapter)
                          }
                        }}
                      >
                        <div className='flex items-center'>
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
                        {chapter.subchapters &&
                          (expandedChapters.has(
                            `${unit.unit}-${chapter.chapter}`
                          ) ? (
                            <ChevronDownIcon className='h-3 w-3' />
                          ) : (
                            <ChevronRightIcon className='h-3 w-3' />
                          ))}
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
