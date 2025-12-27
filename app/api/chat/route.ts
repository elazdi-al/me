import { NextRequest, NextResponse } from 'next/server'
import { CoreMessage, streamText } from 'ai'
import { google } from '@ai-sdk/google'

interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string | Array<{
    type: 'text' | 'file'
    text?: string
    file?: {
      filename: string
      file_data: string
    }
  }>
}

interface CourseContext {
  courseName: string
  pdfBase64: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { messages, courseContext } = body as { 
      messages: ChatMessage[], 
      courseContext?: CourseContext | null 
    }

    // Check if API key is configured
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Google Generative AI API key not configured' },
        { status: 500 }
      )
    }

    // Create system message
    const systemMessageContent = courseContext 
      ? `You are an AI assistant helping students with their course materials. You have access to a PDF document for: ${courseContext.courseName}.

Instructions:
- Answer questions based on the provided course material
- Be concise but thorough in your explanations
- If information isn't in the provided material, say so clearly
- Use examples from the course material when relevant
- Format your responses clearly with proper markdown
- Always cite which course material you're referencing in your answer

The PDF is provided as a file attachment. Please analyze it to answer the user's questions.`
      : 'You are a helpful AI assistant.'

    // Prepare messages for AI SDK
    const apiMessages: CoreMessage[] = [
      { role: 'system', content: systemMessageContent },
      // Assuming incoming messages have content as string
      ...messages.map(m => ({role: m.role, content: m.content as string}))
    ]

    // Add PDF to the first user message if we have course context
    if (courseContext) {
      const firstUserMessageIndex = apiMessages.findIndex(m => m.role === 'user')
      if (firstUserMessageIndex !== -1) {
        const firstUserMessage = apiMessages[firstUserMessageIndex]
        
        const content: (string | { type: 'text'; text: string; } | { type: 'file'; data: Buffer; mimeType: 'application/pdf'; })[] = [];
        
        if (typeof firstUserMessage.content === 'string') {
            content.push({
                type: 'text',
                text: firstUserMessage.content || 'Please analyze the attached course material.'
            });
        }

        content.push({
            type: 'file',
            data: Buffer.from(courseContext.pdfBase64, 'base64'),
            mimeType: 'application/pdf',
        });
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (apiMessages as any)[firstUserMessageIndex] = {
          ...firstUserMessage,
          content,
        }
      }
    }

    // Make request to Google Gemini
    const result = await streamText({
      model: google('gemini-2.5-flash-preview-04-17'),
      messages: apiMessages,
      temperature: 0.7,
      maxTokens: 1000,
    })

    // Return the streaming response
    return result.toDataStreamResponse()

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 