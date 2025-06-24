import Dexie, { Table } from 'dexie'

// Database schema for storing PDFs as base64
interface StoredPDF {
  id: string
  courseName: string
  pdfUrl: string
  pdfBase64: string
  lastUpdated: number
}

class PDFDatabase extends Dexie {
  pdfs!: Table<StoredPDF>

  constructor() {
    super('PDFDatabase')
    this.version(1).stores({
      pdfs: 'id, courseName, pdfUrl, lastUpdated'
    })
  }
}

const db = new PDFDatabase()

// Download PDF directly from GitHub (client-side)
export const downloadPDF = async (url: string): Promise<Blob> => {
  try {
    const response = await fetch(url, {
      mode: 'cors',
      headers: {
        'Accept': 'application/pdf',
      }
    })
    
    if (!response.ok) {
      throw new Error(`Failed to download PDF: ${response.status}`)
    }
    
    return await response.blob()
  } catch (error) {
    console.error('Error downloading PDF:', error)
    throw error
  }
}

// Convert PDF blob to base64 string
export const convertPDFToBase64 = async (pdfBlob: Blob): Promise<string> => {
  try {
    const arrayBuffer = await pdfBlob.arrayBuffer()
    const uint8Array = new Uint8Array(arrayBuffer)
    const binaryString = Array.from(uint8Array, byte => String.fromCharCode(byte)).join('')
    return btoa(binaryString)
  } catch (error) {
    console.error('Error converting PDF to base64:', error)
    throw error
  }
}

// Check if PDF is stored locally
export const isPDFCached = async (courseId: string): Promise<boolean> => {
  try {
    const stored = await db.pdfs.get(courseId)
    return !!stored
  } catch (error) {
    console.error('Error checking PDF cache:', error)
    return false
  }
}

// Get stored PDF and text
export const getCachedPDF = async (courseId: string): Promise<StoredPDF | null> => {
  try {
    const stored = await db.pdfs.get(courseId)
    return stored || null
  } catch (error) {
    console.error('Error getting cached PDF:', error)
    return null
  }
}

// Store PDF as base64
export const storePDF = async (
  courseId: string,
  courseName: string,
  pdfUrl: string,
  pdfBase64: string
): Promise<void> => {
  try {
    await db.pdfs.put({
      id: courseId,
      courseName,
      pdfUrl,
      pdfBase64,
      lastUpdated: Date.now()
    })
  } catch (error) {
    console.error('Error storing PDF:', error)
    throw error
  }
}

// Get or download and process PDF
export const getOrFetchPDF = async (
  courseId: string,
  courseName: string,
  pdfUrl: string,
  onProgress?: (stage: string) => void
): Promise<string> => {
  onProgress?.('Checking cache...')
  
  // Check if we have it cached
  const cached = await getCachedPDF(courseId)
  if (cached) {
    onProgress?.('Found in cache!')
    return cached.pdfBase64
  }
  
  onProgress?.('Downloading PDF...')
  
  // Download PDF from GitHub
  const pdfBlob = await downloadPDF(pdfUrl)
  
  onProgress?.('Converting to base64...')
  
  // Convert to base64
  const pdfBase64 = await convertPDFToBase64(pdfBlob)
  
  onProgress?.('Storing for future use...')
  
  // Store for future use
  await storePDF(courseId, courseName, pdfUrl, pdfBase64)
  
  onProgress?.('Ready!')
  
  return pdfBase64
}

// Clear all cached PDFs (for debugging/cleanup)
export const clearPDFCache = async (): Promise<void> => {
  try {
    await db.pdfs.clear()
  } catch (error) {
    console.error('Error clearing PDF cache:', error)
    throw error
  }
} 