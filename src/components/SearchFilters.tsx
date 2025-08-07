'use client'

import React from 'react'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'

interface SearchFiltersProps {
  searchTerm: string
  selectedYear: string
  marksRange: string
  availableYears: string[]
  onSearchChange: (term: string) => void
  onYearChange: (year: string) => void
  onMarksRangeChange: (range: string) => void
  onReset: () => void
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchTerm,
  selectedYear,
  marksRange,
  availableYears,
  onSearchChange,
  onYearChange,
  onMarksRangeChange,
  onReset,
}) => {
  return (
    <div className='bg-white border-b border-gray-200 p-3 sm:p-4'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col sm:flex-row gap-3 items-stretch sm:items-center'>
          {/* Search Input */}
          <div className='relative flex-1 max-w-full sm:max-w-md'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <MagnifyingGlassIcon className='h-4 w-4 text-gray-400' />
            </div>
            <input
              type='text'
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className='block w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              placeholder='Search questions...'
            />
          </div>

          {/* Mobile: Filters Row */}
          <div className='flex gap-2 sm:gap-3 flex-1 sm:flex-none'>
            {/* Year Filter */}
            <div className='flex-1 sm:flex-shrink-0'>
              <select
                value={selectedYear}
                onChange={(e) => onYearChange(e.target.value)}
                className='block w-full sm:w-32 px-2 sm:px-3 py-2 text-sm border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              >
                <option value=''>🗓️ All Years</option>
                {availableYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Marks Range Filter */}
            <div className='flex-1 sm:flex-shrink-0'>
              <select
                value={marksRange}
                onChange={(e) => onMarksRangeChange(e.target.value)}
                className='block w-full sm:w-36 px-2 sm:px-3 py-2 text-sm border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              >
                <option value=''>📊 All Marks</option>
                <option value='low'>2-4 marks</option>
                <option value='medium'>5-8 marks</option>
                <option value='high'>9+ marks</option>
              </select>
            </div>

            {/* Reset Button */}
            <button
              onClick={onReset}
              className='flex-shrink-0 inline-flex items-center px-3 sm:px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200'
            >
              <XMarkIcon className='h-4 w-4 sm:mr-1' />
              <span className='hidden sm:inline'>Reset</span>
            </button>
          </div>
        </div>

        {/* Active Filters Display */}
        {(searchTerm || selectedYear || marksRange) && (
          <div className='mt-3 flex flex-wrap gap-2'>
            {searchTerm && (
              <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
                Search: &ldquo;{searchTerm}&rdquo;
                <button
                  onClick={() => onSearchChange('')}
                  className='ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-600'
                >
                  <XMarkIcon className='h-3 w-3' />
                </button>
              </span>
            )}
            {selectedYear && (
              <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800'>
                Year: {selectedYear}
                <button
                  onClick={() => onYearChange('')}
                  className='ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-green-400 hover:bg-green-200 hover:text-green-600'
                >
                  <XMarkIcon className='h-3 w-3' />
                </button>
              </span>
            )}
            {marksRange && (
              <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800'>
                Marks: {marksRange}
                <button
                  onClick={() => onMarksRangeChange('')}
                  className='ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-purple-400 hover:bg-purple-200 hover:text-purple-600'
                >
                  <XMarkIcon className='h-3 w-3' />
                </button>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchFilters
