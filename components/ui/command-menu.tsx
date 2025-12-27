'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Search, X, CornerDownLeft } from 'lucide-react'
import { useChat } from '@ai-sdk/react'
import { useCommandMenuStore } from '@/lib/command-menu-store'
import { COURSE_NOTES } from '@/app/data'
import { getOrFetchPDF } from '@/lib/pdf-storage'
import { TextShimmer } from '@/components/motion-primitives/text-shimmer'

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
    scale: 0.6,
    x: -20,
    transition: { 
      duration: 0.2,
      ease: "easeInOut"
    }
  }
}

const badgeContentVariants = {
  visible: { opacity: 1 },
  exit: { 
    opacity: 0,
    transition: { 
      duration: 0.08,
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

const responseVariants = {
  hidden: { 
    opacity: 0, 
    y: 10,
    scale: 0.95 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      duration: 0.4,
      bounce: 0.1
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: { 
      duration: 0.2,
      ease: "easeInOut"
    }
  }
}

export function CommandMenu() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentStage, setCurrentStage] = useState('')
  const [courseContext, setCourseContext] = useState<{ courseName: string; pdfBase64: string } | null>(null)
  
  const {
    isOpen,
    inputValue,
    selectedCourse,
    aiSuggestion,
    isTyping,
    openMenu,
    closeMenu,
    toggleMenu,
    setInputValue,
    clearCourse,
    acceptAiSuggestion,
    rejectAiSuggestion,
    reset
  } = useCommandMenuStore()

  // Use AI SDK's useChat hook for cleaner streaming
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setInput,
    setMessages
  } = useChat({
    api: '/api/chat',
    body: {
      courseContext
    },
    onFinish: () => {
      setIsProcessing(false)
      setCurrentStage('')
    },
    onError: (error) => {
      console.error('Chat error:', error)
      setIsProcessing(false)
      setCurrentStage('')
    }
  })

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

  // Check if user has typed a question (text without @)
  const hasQuestion = inputValue.trim() && !inputValue.includes('@') && selectedCourse !== null

  // Handle sending search query
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || !selectedCourse || isProcessing) return

    setIsProcessing(true)
    setCurrentStage('Preparing course context...')

    try {
      // Prepare course context
      let newCourseContext = null
      
      if (selectedCourse) {
        const courseData = COURSE_NOTES.find(c => c.name === selectedCourse)
        if (courseData) {
          setCurrentStage(`Downloading ${selectedCourse} PDF...`)
          const pdfBase64 = await getOrFetchPDF(
            courseData.id,
            selectedCourse,
            courseData.pdfUrl,
            (stage) => setCurrentStage(`${selectedCourse}: ${stage}`)
          )
          newCourseContext = { courseName: selectedCourse, pdfBase64 }
          setCourseContext(newCourseContext)
        }
      }

      setCurrentStage('Thinking...')
      
      // Set the input and submit using AI SDK
      setInput(inputValue)
      
      // Clear the command menu input but keep the AI SDK input
      setInputValue('')
      
      // Let the useChat hook handle the submission
      setTimeout(() => {
        const form = document.querySelector('form[data-chat-form]') as HTMLFormElement
        if (form) {
          form.requestSubmit()
        }
      }, 100)
      
    } catch (error) {
      console.error('Error processing search:', error)
      setIsProcessing(false)
      setCurrentStage('')
    }
  }

  // Suppress unused variable warning - handleSearch is ready for future use
  void handleSearch

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
      
      if (e.key === 'Backspace' && inputValue === '' && selectedCourse) {
        e.preventDefault()
        clearCourse()
      }

      if (e.key === 'Enter' && hasQuestion && !isProcessing) {
        e.preventDefault()
        // Temporarily disabled - do nothing for now
        // handleSearch(e as any)
      }
      
      // Any other key rejects the suggestion
      if (aiSuggestion && e.key !== 'Tab' && e.key !== 'Escape' && e.key !== 'Meta' && e.key !== 'Shift' && e.key !== 'Control' && e.key !== 'Alt' && e.key !== 'Enter') {
        rejectAiSuggestion()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, inputValue, selectedCourse, aiSuggestion, isTyping, toggleMenu, closeMenu, acceptAiSuggestion, rejectAiSuggestion, clearCourse, isProcessing, hasQuestion])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
    if (!isOpen) {
      reset()
      setIsProcessing(false)
      setCurrentStage('')
      setMessages([])
      setCourseContext(null)
    }
  }, [isOpen, reset, setMessages])

  // Disable body scroll when command menu is open
  useEffect(() => {
    if (isOpen) {
      // Store original overflow value
      const originalStyle = window.getComputedStyle(document.body).overflow
      document.body.style.overflow = 'hidden'
      
      // Cleanup function to restore scroll
      return () => {
        document.body.style.overflow = originalStyle
      }
    }
  }, [isOpen])

  const suggestionDisplay = getSuggestionDisplay()

  // Get the latest AI response
  const latestResponse = messages.filter(m => m.role === 'assistant').pop()

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
            {/* Backdrop - Blocks all background interactions */}
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
              style={{ pointerEvents: 'all' }}
              onClick={closeMenu}
            />

            {/* Command Menu */}
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 transform"
              style={{ pointerEvents: 'all' }}
            >
              <div className="mx-4 relative">
                <div className="overflow-hidden rounded-2xl bg-white/90 backdrop-blur-xl shadow-2xl ring-1 ring-black/5 dark:bg-zinc-900/90 dark:ring-white/10">
                  
                  {/* Search Input */}
                  <div className="flex items-center gap-3 px-4 py-3">
                    <Search className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
                    
                    <div className="flex-1 flex flex-wrap items-center gap-2">
                      {/* Selected Course Badge */}
                      <AnimatePresence mode="popLayout">
                        {selectedCourse && (
                          <motion.div
                            key={selectedCourse}
                            variants={badgeVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            layout
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 rounded-full px-2 py-1 text-xs border border-zinc-200/50 dark:border-zinc-700/50"
                          >
                            <motion.div
                              variants={badgeContentVariants}
                              className="flex items-center gap-1"
                            >
                              <span className="text-zinc-500 dark:text-zinc-400">@</span>
                              <span className="text-zinc-700 dark:text-zinc-300 font-medium">{selectedCourse}</span>
                              <motion.button
                                onClick={() => clearCourse()}
                                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-full p-0.5 hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <X className="h-3 w-3" />
                              </motion.button>
                            </motion.div>
                          </motion.div>
                        )}
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
                          placeholder={
                            !selectedCourse 
                              ? "Press @ to talk to a course" 
                              : "Ask a question about the selected course..."
                          }
                          className="w-full bg-transparent text-base placeholder-zinc-400 outline-none dark:placeholder-zinc-500 dark:text-zinc-100 relative z-10"
                          disabled={isProcessing || isLoading}
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
                      
                      {hasQuestion && !isProcessing && !isLoading && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="flex items-center gap-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 px-2 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-400 border border-zinc-200/50 dark:border-zinc-700/50"
                        >
                          <CornerDownLeft className="h-3 w-3" />
                          <span>SEND</span>
                        </motion.div>
                      )}

                      <kbd className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                        ESC
                      </kbd>
                    </div>
                  </div>

                  {/* Hidden form for AI SDK */}
                  <form 
                    onSubmit={handleSubmit} 
                    data-chat-form 
                    className="hidden"
                  >
                    <input
                      value={input}
                      onChange={handleInputChange}
                      disabled={isLoading}
                    />
                  </form>

                  {/* Loading State or Answer */}
                  <AnimatePresence mode="wait">
                    {currentStage && (
                      <motion.div
                        variants={responseVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="border-t border-zinc-200/50 dark:border-zinc-700/50 px-4 py-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-3 h-3 border border-zinc-300 dark:border-zinc-600 border-t-transparent rounded-full"
                            />
                          </div>
                          <TextShimmer 
                            className="text-sm text-zinc-600 dark:text-zinc-400"
                            duration={2}
                          >
                            {currentStage}
                          </TextShimmer>
                        </div>
                      </motion.div>
                    )}

                    {latestResponse && (
                      <motion.div
                        variants={responseVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="border-t border-zinc-200/50 dark:border-zinc-700/50 px-4 py-4 max-h-80 overflow-y-auto"
                      >
                        <div className="prose prose-sm max-w-none dark:prose-invert">
                          <div className="whitespace-pre-wrap text-zinc-700 dark:text-zinc-300">
                            {latestResponse.parts
                              .filter(part => part.type === 'text')
                              .map((part, i) => (
                                <span key={`text-${i}-${part.text?.slice(0, 10)}`}>
                                  {part.text}
                                </span>
                              ))}
                            {isLoading && (
                              <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                                className="inline-block w-2 h-4 bg-zinc-400 ml-1"
                              />
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
} 