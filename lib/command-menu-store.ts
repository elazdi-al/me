import { create } from 'zustand'
import { COURSE_NOTES } from '@/app/data'

interface CommandMenuState {
  // Core state
  isOpen: boolean
  inputValue: string
  selectedCourses: string[]
  aiSuggestion: string
  isTyping: boolean
  
  // Computed values
  courses: string[]
  
  // Actions
  openMenu: () => void
  closeMenu: () => void
  toggleMenu: () => void
  setInputValue: (value: string) => void
  addCourse: (course: string) => void
  removeCourse: (course: string) => void
  removeLastCourse: () => void
  clearAllCourses: () => void
  acceptAiSuggestion: () => void
  rejectAiSuggestion: () => void
  generateAiSuggestion: (query: string) => void
  reset: () => void
}

// Simple AI-like fuzzy matching function
const findBestCourseMatch = (query: string, courses: string[]): string => {
  if (!query.trim()) return ''
  
  const queryLower = query.toLowerCase()
  
  // Exact matches first
  const exactMatch = courses.find(course => 
    course.toLowerCase().includes(queryLower)
  )
  if (exactMatch) return exactMatch
  
  // Fuzzy matching - find best score
  let bestMatch = ''
  let bestScore = 0
  
  courses.forEach(course => {
    const courseLower = course.toLowerCase()
    let score = 0
    
    // Check for word matches
    const queryWords = queryLower.split(' ')
    const courseWords = courseLower.split(' ')
    
    queryWords.forEach(queryWord => {
      courseWords.forEach(courseWord => {
        if (courseWord.includes(queryWord)) {
          score += queryWord.length / courseWord.length
        }
        if (courseWord.startsWith(queryWord)) {
          score += 2
        }
      })
    })
    
    // Acronym matching (comp -> Computer)
    if (queryLower.length <= 6) {
      const acronym = courseWords.map(word => word[0]).join('')
      if (acronym.includes(queryLower)) {
        score += 3
      }
    }
    
    if (score > bestScore) {
      bestScore = score
      bestMatch = course
    }
  })
  
  return bestScore > 0.5 ? bestMatch : ''
}

export const useCommandMenuStore = create<CommandMenuState>((set, get) => {
  const courses = COURSE_NOTES.map(course => course.name)
  
  return {
    // Initial state
    isOpen: false,
    inputValue: '',
    selectedCourses: [],
    aiSuggestion: '',
    isTyping: false,
    
    // Computed values
    courses,
    
    // Actions
    openMenu: () => set({ isOpen: true }),
    
    closeMenu: () => set({ isOpen: false }),
    
    toggleMenu: () => set(state => ({ isOpen: !state.isOpen })),
    
    setInputValue: (value: string) => set(state => {
      // Clear AI suggestion when typing
      const newState: Partial<CommandMenuState> = { 
        inputValue: value,
        isTyping: true,
        aiSuggestion: ''
      }
      
      // Generate AI suggestion after a short delay
      setTimeout(() => {
        get().generateAiSuggestion(value)
      }, 300)
      
      return newState
    }),
    
    addCourse: (course: string) => set(state => {
      // Remove the @ and any text after it from the input when selecting a course
      const atIndex = state.inputValue.lastIndexOf('@')
      const newInputValue = atIndex !== -1 ? state.inputValue.slice(0, atIndex) : state.inputValue
      
      return {
        selectedCourses: [...state.selectedCourses, course],
        inputValue: newInputValue,
        aiSuggestion: '',
        isTyping: false
      }
    }),
    
    removeCourse: (courseToRemove: string) => set(state => ({
      selectedCourses: state.selectedCourses.filter(course => course !== courseToRemove)
    })),
    
    removeLastCourse: () => set(state => ({
      selectedCourses: state.selectedCourses.slice(0, -1)
    })),
    
    clearAllCourses: () => set({ selectedCourses: [] }),
    
    acceptAiSuggestion: () => set(state => {
      if (!state.aiSuggestion) return state
      
      const atIndex = state.inputValue.lastIndexOf('@')
      if (atIndex === -1) return state
      
      // Replace the @ query with the full course name
      const beforeAt = state.inputValue.slice(0, atIndex)
      
      return {
        inputValue: beforeAt,
        selectedCourses: [...state.selectedCourses, state.aiSuggestion],
        aiSuggestion: '',
        isTyping: false
      }
    }),
    
    rejectAiSuggestion: () => set({
      aiSuggestion: '',
      isTyping: false
    }),
    
    generateAiSuggestion: (query: string) => set(state => {
      // Only generate suggestions for @ queries
      const atIndex = query.lastIndexOf('@')
      if (atIndex === -1) {
        return { aiSuggestion: '', isTyping: false }
      }
      
      const searchTerm = query.slice(atIndex + 1)
      if (searchTerm.length < 2) {
        return { aiSuggestion: '', isTyping: false }
      }
      
      const suggestion = findBestCourseMatch(searchTerm, courses)
      
      return {
        aiSuggestion: suggestion,
        isTyping: false
      }
    }),
    
    reset: () => set({
      inputValue: '',
      selectedCourses: [],
      aiSuggestion: '',
      isTyping: false
    })
  }
}) 