export interface Question {
  question_no: number
  year: string
  marks?: string
  question: string
  unit?: number
  chapter?: (number | string)[]
  Type?: string
}

export interface Subchapter {
  subchapter: string
  title: string
}

export interface Chapter {
  chapter: number
  title: string
  subchapters?: Subchapter[]
}

export interface Unit {
  unit: number
  title: string
  chapters: Chapter[]
}

export interface Syllabus {
  syllabus: Unit[]
}

export interface FilterState {
  searchTerm: string
  selectedYear: string
  marksRange: string
  questionType: string
  selectedUnit: number | null
  selectedChapter: number | null
  selectedSubchapter: string | null
}
