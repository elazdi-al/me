## Setup Instructions

### Environment Variables

To enable the AI chat functionality with course PDFs, you need to set up a Google Generative AI API key:

1. Get a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a `.env.local` file in the root directory
3. Add your API key:

```bash
GOOGLE_GENERATIVE_AI_API_KEY=your_google_api_key_here
```

⚠️ **Security Note**: The API key is now stored server-side only. Never use `NEXT_PUBLIC_` prefix for API keys as it exposes them publicly to all users.

### Features

#### AI-Powered Course Chat
- **Command Menu**: Press `⌘ K` to open the command interface
- **Single Course Selection**: Type `@` followed by course name to select one course
- **Smart Autocomplete**: AI suggests course names as you type
- **PDF Processing**: Automatically downloads and processes course PDFs from GitHub
- **Local Caching**: PDFs are cached locally using IndexedDB for faster subsequent access
- **Secure API**: Server-side Google Gemini integration with secure API key handling
- **Advanced PDF Processing**: Uses Google Gemini 2.5 Flash Preview for sophisticated PDF analysis
- **Streaming Responses**: Real-time AI responses with visual feedback

#### How to Use
1. Press `⌘ K` to open the command menu
2. Type `@comp` and select "Computer Systems" from suggestions
3. Type your question about the selected course
4. Press Enter or click Send to get AI-powered answers

**Note**: Only one course can be selected at a time for focused, accurate responses.

The system will:
- Download PDFs directly from GitHub (client-side, no server costs)
- Cache PDFs locally for future use
- Send PDF content to Google Gemini 2.5 Flash Preview model
- Stream back contextual answers based on your course materials with advanced multimodal understanding
