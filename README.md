# RAG News Chatbot – Backend (Assignment)

## 1. Tech Stack
- Node.js + Express
- Jina Embeddings
- Qdrant Vector DB
- Google Gemini API
- Redis (chat history)

## 2. API Endpoints

### `GET /api/session`
Create a new chat session.

### `POST /api/chat`
Send user message, generate RAG answer.

### `GET /api/history/:sessionId`
Fetch chat history.

### `DELETE /api/history/:sessionId`
Clear chat session.

## 3. Run Backend



npm install npm start
Requires:
- Redis running
- Qdrant running at `http://localhost:6333`
- `.env` file with:


  GEMINI_API_KEY=your_key_here
## 4. RAG Flow
1. Embed user query (Jina)
2. Search relevant news from Qdrant
3. Combine context
4. Generate final answer (Gemini)
   
