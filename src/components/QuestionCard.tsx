'use client'

import React from 'react'
import { Question } from '@/types'

interface QuestionCardProps {
  question: Question
  highlightSearch?: string
  displayIndex?: number
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  highlightSearch,
  displayIndex,
}) => {
  const highlightText = (text: string, highlight?: string) => {
    if (!highlight) return text

    const parts = text.split(new RegExp(`(${highlight})`, 'gi'))
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <mark key={index} className='bg-yellow-200 px-1 rounded'>
          {part}
        </mark>
      ) : (
        part
      )
    )
  }

  const getMarksTotal = (marks?: string) => {
    // Calculate total marks from marks string like "2+6" or "3+5"
    if (!marks || typeof marks !== 'string') return 0
    const numbers = marks.match(/\d+/g)
    if (!numbers) return 0
    return numbers.reduce((sum, num) => sum + parseInt(num), 0)
  }

  const getMarksColor = (marks?: string) => {
    if (!marks || typeof marks !== 'string') return 'bg-gray-500 text-white'
    const total = getMarksTotal(marks)
    if (total <= 4) return 'bg-green-500 text-white'
    if (total <= 8) return 'bg-blue-500 text-white'
    return 'bg-purple-500 text-white'
  }

  return (
    <div className='bg-white rounded-lg border border-gray-200 p-4 sm:p-5 hover:shadow-md hover:border-gray-300 transition-all duration-200'>
      {/* Main content layout */}
      <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4'>
        {/* Left side - Question content */}
        <div className='flex-1 min-w-0'>
          {/* Question text with number inline */}
          <div className='prose max-w-none mb-3'>
            <p className='text-gray-800 leading-relaxed text-base sm:text-lg font-medium'>
              <span className='inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-sm sm:text-base font-bold bg-blue-500 text-white mr-2 sm:mr-3'>
                {displayIndex !== undefined
                  ? displayIndex
                  : question.question_no}
              </span>
              <span className='text-gray-700'>
                {highlightText(question.question, highlightSearch)}
              </span>
            </p>
          </div>

          {/* Chapter info */}
          {question.chapter && question.chapter.length > 0 && (
            <div className='flex items-center gap-2 text-xs flex-wrap'>
              <span className='px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium'>
                Ch. {question.chapter.join(', ')}
              </span>
            </div>
          )}
        </div>

        {/* Right side - Marks and Year */}
        <div className='flex items-center justify-start sm:justify-end gap-2 sm:gap-3 flex-shrink-0'>
          <span
            className={`inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-sm font-bold ${getMarksColor(
              question.marks
            )}`}
          >
            <svg
              className='w-3 h-3 mr-1'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
            </svg>
            {question.marks || 'N/A'}
          </span>
          <span className='inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-sm font-bold bg-orange-500 text-white'>
            <svg
              className='w-3 h-3 mr-1'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path
                fillRule='evenodd'
                d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z'
                clipRule='evenodd'
              />
            </svg>
            {question.year}
          </span>
        </div>
        {/* Optional: Add a separator line */}
      </div>
    </div>
  )
}

export default QuestionCard
