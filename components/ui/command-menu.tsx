'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Search, X } from 'lucide-react'
import { useCommandMenuStore } from '@/lib/command-menu-store'

// Animation variants for clean transitions
const menuVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95, 
    y: 10,
    transition: { duration: 0.15 }
  },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      duration: 0.2,
      type: "spring",
      bounce: 0.1
    }
  }
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.15 }
  }
}

const badgeVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.3, 
    x: -20,
    transition: { duration: 0.15 }
  },
  visible: { 
    opacity: 1, 
    scale: 1, 
    x: 0,
    transition: {
      type: "spring",
      duration: 0.35,
      bounce: 0.25
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    x: -10,
    transition: { 
      duration: 0.15,
      ease: "easeOut"
    }
  }
}

const inputVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      delay: 0.08, 
      duration: 0.25,
      ease: "easeOut"
    }
  }
}

export function CommandMenu() {
  const inputRef = useRef<HTMLInputElement>(null)
  
  const {
    isOpen,
    inputValue,
    selectedCourses,
    aiSuggestion,
    isTyping,
    openMenu,
    closeMenu,
    toggleMenu,
    setInputValue,
    addCourse,
    removeCourse,
    removeLastCourse,
    acceptAiSuggestion,
    rejectAiSuggestion,
    reset
  } = useCommandMenuStore()

  // Get the suggestion text that should appear after the input
  const getSuggestionDisplay = () => {
    if (!aiSuggestion || isTyping) return ''
    
    const atIndex = inputValue.lastIndexOf('@')
    if (atIndex === -1) return ''
    
    const searchTerm = inputValue.slice(atIndex + 1)
    if (!searchTerm || aiSuggestion.toLowerCase().startsWith(searchTerm.toLowerCase())) {
      // Show the remaining part of the suggestion
      const remaining = aiSuggestion.slice(searchTerm.length)
      return remaining
    }
    
    return ''
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === 'k') {
        e.preventDefault()
        toggleMenu()
      }
      
      if (!isOpen) return
      
      if (e.key === 'Escape') {
        if (aiSuggestion) {
          rejectAiSuggestion()
        } else {
          closeMenu()
        }
      }
      
      if (e.key === 'Tab' && aiSuggestion && !isTyping) {
        e.preventDefault()
        acceptAiSuggestion()
      }
      
      if (e.key === 'Backspace' && inputValue === '' && selectedCourses.length > 0) {
        e.preventDefault()
        removeLastCourse()
      }
      
      // Any other key rejects the suggestion
      if (aiSuggestion && e.key !== 'Tab' && e.key !== 'Escape' && e.key !== 'Meta' && e.key !== 'Shift' && e.key !== 'Control' && e.key !== 'Alt') {
        rejectAiSuggestion()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, inputValue, selectedCourses, aiSuggestion, isTyping, toggleMenu, closeMenu, acceptAiSuggestion, rejectAiSuggestion, removeLastCourse])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
    if (!isOpen) {
      reset()
    }
  }, [isOpen, reset])

  const suggestionDisplay = getSuggestionDisplay()

  return (
    <>
      {/* Bottom Left Badge */}
      <motion.button
        onClick={openMenu}
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2 rounded-full bg-zinc-100/70 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-zinc-600 ring-1 ring-zinc-200/40 transition-all duration-200 hover:bg-zinc-200/70 dark:bg-zinc-800/70 dark:text-zinc-400 dark:ring-zinc-700/40 dark:hover:bg-zinc-700/70"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        animate={isOpen ? { scale: 0.95, opacity: 0.7 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.15 }}
      >
        <Search className="h-3 w-3" />
        <span>⌘ K</span>
      </motion.button>

      {/* Command Menu Overlay */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
              onClick={closeMenu}
            />

            {/* Command Menu */}
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 transform"
            >
              <div className="mx-4 relative">
                <div className="overflow-hidden rounded-2xl bg-white/90 backdrop-blur-xl shadow-2xl ring-1 ring-black/5 dark:bg-zinc-900/90 dark:ring-white/10">
                  {/* Search Input */}
                  <div className="flex items-center gap-3 px-4 py-3">
                    <Search className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
                    
                    <div className="flex-1 flex flex-wrap items-center gap-2">
                      {/* Selected Course Badges */}
                      <AnimatePresence mode="popLayout">
                        {selectedCourses.map((course: string) => (
                          <motion.div
                            key={course}
                            variants={badgeVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            layout
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 rounded-full px-2 py-1 text-xs border border-zinc-200/50 dark:border-zinc-700/50"
                          >
                            <span className="text-zinc-500 dark:text-zinc-400">@</span>
                            <span className="text-zinc-700 dark:text-zinc-300 font-medium">{course}</span>
                            <motion.button
                              onClick={() => removeCourse(course)}
                              className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-full p-0.5 hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <X className="h-3 w-3" />
                            </motion.button>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      
                      {/* Input with Inline AI Suggestion */}
                      <div className="flex-1 relative min-w-0">
                        <motion.input
                          ref={inputRef}
                          variants={inputVariants}
                          initial="hidden"
                          animate="visible"
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          placeholder={selectedCourses.length === 0 ? "Press @ to talk to a course" : ""}
                          className="w-full bg-transparent text-base placeholder-zinc-400 outline-none dark:placeholder-zinc-500 dark:text-zinc-100 relative z-10"
                        />
                        
                        {/* AI Suggestion Overlay */}
                        {suggestionDisplay && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 pointer-events-none z-0"
                          >
                            <div className="text-base text-zinc-400/60 dark:text-zinc-500/60">
                              <span className="invisible">{inputValue}</span>
                              <span className="text-zinc-400/60 dark:text-zinc-500/60">
                                {suggestionDisplay}
                              </span>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {aiSuggestion && !isTyping && (
                        <motion.kbd
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="rounded bg-blue-100 px-1.5 py-0.5 text-xs font-medium text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                        >
                          TAB
                        </motion.kbd>
                      )}
                      <kbd className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                        ESC
                      </kbd>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
} 