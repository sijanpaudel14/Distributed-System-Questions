import { Question, Syllabus } from '@/types'

export async function loadQuestions(): Promise<Question[]> {
  try {
    // Load all question files
    const questionFiles = [
      'question_1.json',
      'question_2.json',
      'question_3.json',
      'question_4.json',
      'question_5.json',
      'question_6.json',
      'question_7.json',
      'question_8.json',
      'question_9.json',
      'question_10.json',
    ]

    const allQuestions: Question[] = []

    for (const file of questionFiles) {
      try {
        const response = await fetch(`/${file}`)
        if (response.ok) {
          const questions = await response.json()
          allQuestions.push(...questions)
        }
      } catch (error) {
        console.warn(`Failed to load ${file}:`, error)
      }
    }

    return allQuestions
  } catch (error) {
    console.error('Error loading questions:', error)
    return []
  }
}

export async function loadSyllabus(): Promise<Syllabus> {
  try {
    const response = await fetch('/syllabus.json')
    if (!response.ok) {
      throw new Error('Failed to load syllabus')
    }
    return await response.json()
  } catch (error) {
    console.error('Error loading syllabus:', error)
    return { syllabus: [] }
  }
}

export function filterQuestions(
  questions: Question[],
  filters: {
    searchTerm: string
    selectedYear: string
    marksRange: string
    questionType: string
    selectedUnit: number | null
    selectedChapter: number | null
    selectedSubchapter: string | null
  }
): Question[] {
  return questions.filter((question) => {
    // Search term filter
    if (
      filters.searchTerm &&
      !question.question
        .toLowerCase()
        .includes(filters.searchTerm.toLowerCase())
    ) {
      return false
    }

    // Year filter
    if (filters.selectedYear && question.year !== filters.selectedYear) {
      return false
    }

    // Question type filter
    if (filters.questionType && question.Type !== filters.questionType) {
      return false
    }

    // Unit filter
    if (
      filters.selectedUnit !== null &&
      question.unit !== filters.selectedUnit
    ) {
      return false
    }

    // Chapter filter - only apply if no subchapter is selected
    if (
      filters.selectedChapter !== null &&
      filters.selectedSubchapter === null &&
      question.chapter
    ) {
      // Check if question's chapter array contains the selected chapter
      // Chapter can be either a number (like 5.1) or string (like "5.1.1" or "5.4")
      const selectedChapter = filters.selectedChapter
      const hasMatchingChapter = question.chapter.some((ch) => {
        if (typeof ch === 'number') {
          return ch === selectedChapter
        } else if (typeof ch === 'string') {
          // First check if it's an exact match (for cases like "5.4" matching chapter 5.4)
          if (parseFloat(ch) === selectedChapter) {
            return true
          }
          // Then check if it's a subchapter that starts with the chapter number (like "5.1.1" for chapter 5.1)
          const chapterStr = selectedChapter.toString()
          return ch.startsWith(chapterStr + '.')
        }
        return false
      })

      if (!hasMatchingChapter) {
        return false
      }
    }

    // Subchapter filter - when subchapter is selected
    if (filters.selectedSubchapter !== null) {
      // Check if question's chapter array contains the selected subchapter
      if (
        !question.chapter ||
        !question.chapter.some(
          (ch) => typeof ch === 'string' && ch === filters.selectedSubchapter
        )
      ) {
        return false
      }
    }

    // Marks range filter
    if (filters.marksRange && question.marks) {
      const totalMarks = getTotalMarks(question.marks)
      switch (filters.marksRange) {
        case 'low':
          if (totalMarks > 4) return false
          break
        case 'medium':
          if (totalMarks < 5 || totalMarks > 8) return false
          break
        case 'high':
          if (totalMarks < 9) return false
          break
      }
    }

    return true
  })
}

function getTotalMarks(marks: string): number {
  if (!marks || typeof marks !== 'string') return 0
  const numbers = marks.match(/\d+/g)
  if (!numbers) return 0
  return numbers.reduce((sum, num) => sum + parseInt(num), 0)
}

export function getUniqueYears(questions: Question[]): string[] {
  const years = new Set(questions.map((q) => q.year))
  return Array.from(years).sort()
}

export function getQuestionsByUnit(
  questions: Question[],
  unit: number
): Question[] {
  return questions.filter((q) => q.unit === unit)
}

export function getQuestionsByChapter(
  questions: Question[],
  unit: number,
  chapter: number
): Question[] {
  return questions.filter(
    (q) =>
      q.unit === unit &&
      q.chapter?.some((ch) => {
        if (typeof ch === 'number') {
          return ch === chapter
        } else if (typeof ch === 'string') {
          // First check if it's an exact match (for cases like "5.4" matching chapter 5.4)
          if (parseFloat(ch) === chapter) {
            return true
          }
          // Then check if it's a subchapter that starts with the chapter number (like "5.1.1" for chapter 5.1)
          const chapterStr = chapter.toString()
          return ch.startsWith(chapterStr + '.')
        }
        return false
      })
  )
}
