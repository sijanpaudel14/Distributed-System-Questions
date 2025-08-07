'use client'

import React, { useState, useEffect } from 'react'
import { Question, Unit, FilterState } from '@/types'
import {
  loadQuestions,
  loadSyllabus,
  filterQuestions,
  getUniqueYears,
} from '@/utils/dataLoader'
import Sidebar from '@/components/Sidebar'
import SearchFilters from '@/components/SearchFilters'
import QuestionsList from '@/components/QuestionsList'
import MobileNavigation from '@/components/MobileNavigation'

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [syllabus, setSyllabus] = useState<Unit[]>([])
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    selectedYear: '',
    marksRange: '',
    questionType: '',
    selectedUnit: null,
    selectedChapter: null,
    selectedSubchapter: null,
  })

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const [questionsData, syllabusData] = await Promise.all([
          loadQuestions(),
          loadSyllabus(),
        ])

        setQuestions(questionsData)
        setSyllabus(syllabusData.syllabus)
        setFilteredQuestions(questionsData)
      } catch (err) {
        setError('Failed to load data. Please try again.')
        console.error('Error loading data:', err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Filter questions when filters change
  useEffect(() => {
    const filtered = filterQuestions(questions, filters)
    setFilteredQuestions(filtered)
  }, [questions, filters])

  const handleUnitSelect = (unit: number) => {
    setFilters((prev) => ({
      ...prev,
      selectedUnit: unit,
      selectedChapter: null,
      selectedSubchapter: null,
    }))
  }

  const handleChapterSelect = (unit: number, chapter: number) => {
    setFilters((prev) => ({
      ...prev,
      selectedUnit: unit,
      selectedChapter: chapter,
      selectedSubchapter: null,
    }))
  }

  const handleSubchapterSelect = (
    unit: number,
    chapter: number,
    subchapter: string
  ) => {
    setFilters((prev) => ({
      ...prev,
      selectedUnit: unit,
      selectedChapter: chapter,
      selectedSubchapter: subchapter,
    }))
  }

  const handleViewAll = () => {
    setFilters((prev) => ({
      ...prev,
      selectedUnit: null,
      selectedChapter: null,
      selectedSubchapter: null,
    }))
  }

  const handleSearchChange = (searchTerm: string) => {
    setFilters((prev) => ({ ...prev, searchTerm }))
  }

  const handleYearChange = (selectedYear: string) => {
    setFilters((prev) => ({ ...prev, selectedYear }))
  }

  const handleMarksRangeChange = (marksRange: string) => {
    setFilters((prev) => ({ ...prev, marksRange }))
  }

  const handleQuestionTypeChange = (questionType: string) => {
    setFilters((prev) => ({ ...prev, questionType }))
  }

  const handleReset = () => {
    setFilters({
      searchTerm: '',
      selectedYear: '',
      marksRange: '',
      questionType: '',
      selectedUnit: null,
      selectedChapter: null,
      selectedSubchapter: null,
    })
  }

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
          <p className='text-gray-600'>Loading questions...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='text-red-500 text-6xl mb-4'>⚠️</div>
          <h2 className='text-xl font-semibold text-gray-900 mb-2'>
            Error Loading Data
          </h2>
          <p className='text-gray-600 mb-4'>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700'
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  const availableYears = getUniqueYears(questions)

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Mobile Navigation */}
      <MobileNavigation
        syllabus={syllabus}
        selectedUnit={filters.selectedUnit}
        selectedChapter={filters.selectedChapter}
        selectedSubchapter={filters.selectedSubchapter}
        onUnitSelect={handleUnitSelect}
        onChapterSelect={handleChapterSelect}
        onSubchapterSelect={handleSubchapterSelect}
        onViewAll={handleViewAll}
      />

      <div className='flex min-h-screen lg:h-screen'>
        {/* Desktop Sidebar */}
        <div className='hidden lg:block'>
          <Sidebar
            syllabus={syllabus}
            selectedUnit={filters.selectedUnit}
            selectedChapter={filters.selectedChapter}
            selectedSubchapter={filters.selectedSubchapter}
            onUnitSelect={handleUnitSelect}
            onChapterSelect={handleChapterSelect}
            onSubchapterSelect={handleSubchapterSelect}
            onViewAll={handleViewAll}
          />
        </div>

        {/* Main content */}
        <div className='flex-1 flex flex-col min-w-0 pt-16 lg:pt-0'>
          {/* Search and Filters */}
          <SearchFilters
            searchTerm={filters.searchTerm}
            selectedYear={filters.selectedYear}
            marksRange={filters.marksRange}
            questionType={filters.questionType}
            availableYears={availableYears}
            onSearchChange={handleSearchChange}
            onYearChange={handleYearChange}
            onMarksRangeChange={handleMarksRangeChange}
            onQuestionTypeChange={handleQuestionTypeChange}
            onReset={handleReset}
          />

          {/* Questions List */}
          <QuestionsList
            questions={filteredQuestions}
            searchTerm={filters.searchTerm}
            selectedUnit={filters.selectedUnit}
            selectedChapter={filters.selectedChapter}
            selectedSubchapter={filters.selectedSubchapter}
          />
        </div>
      </div>
    </div>
  )
}
