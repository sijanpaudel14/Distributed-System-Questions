'use client'

import React from 'react'
import { Question } from '@/types'
import QuestionCard from './QuestionCard'

interface QuestionsListProps {
  questions: Question[]
  searchTerm: string
  selectedUnit: number | null
  selectedChapter: number | null
  selectedSubchapter: string | null
}

const QuestionsList: React.FC<QuestionsListProps> = ({
  questions,
  searchTerm,
  selectedUnit,
  selectedChapter,
  selectedSubchapter,
}) => {
  const getTitle = () => {
    if (selectedSubchapter) {
      return `Questions for Unit ${selectedUnit}, Chapter ${selectedChapter}, Subchapter ${selectedSubchapter}`
    }
    if (selectedChapter) {
      return `Questions for Unit ${selectedUnit}, Chapter ${selectedChapter}`
    }
    if (selectedUnit) {
      return `Questions for Unit ${selectedUnit}`
    }
    return 'All Questions'
  }

  const getSubtitle = () => {
    const count = questions.length
    if (searchTerm) {
      return `${count} question${
        count !== 1 ? 's' : ''
      } found matching "${searchTerm}"`
    }
    return `${count} question${count !== 1 ? 's' : ''} available`
  }

  if (questions.length === 0) {
    return (
      <div className='flex-1 bg-gray-50 p-8'>
        <div className='max-w-4xl mx-auto'>
          <div className='text-center py-12'>
            <div className='text-gray-400 text-6xl mb-4'>📚</div>
            <h3 className='text-lg font-medium text-gray-900 mb-2'>
              No questions found
            </h3>
            <p className='text-gray-500'>
              {searchTerm
                ? `No questions match your search for "${searchTerm}"`
                : 'No questions available for the selected criteria'}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='flex-1 bg-gray-50 overflow-y-auto'>
      <div className='max-w-5xl mx-auto p-6'>
        {/* Header */}
        <div className='mb-6 text-center'>
          <h1 className='text-2xl font-bold text-gray-900 mb-2'>
            {getTitle()}
          </h1>
          <p className='text-gray-600 text-sm bg-white px-4 py-2 rounded-full border border-gray-200 inline-block'>
            {getSubtitle()}
          </p>
        </div>

        {/* Questions Grid */}
        <div className='space-y-3'>
          {questions.map((question, index) => (
            <QuestionCard
              key={`${question.question_no}-${question.year}-${index}`}
              question={question}
              highlightSearch={searchTerm}
              displayIndex={index + 1}
            />
          ))}
        </div>

        {/* Load more placeholder (can be implemented later) */}
        {questions.length > 10 && (
          <div className='mt-8 text-center'>
            <p className='text-gray-500 text-sm'>
              Showing {questions.length} questions
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuestionsList
