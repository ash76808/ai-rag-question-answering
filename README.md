# ai-rag-question-answering
AI-powered question answering system using RAG architecture with secure backend and LLM integration.

# 🚀 RAG-based Smart Q&A API

A backend system that answers user questions using a **Retrieval-Augmented Generation (RAG)** pipeline.
It retrieves relevant documents from MongoDB and generates grounded responses using Groq LLM.

---

## 🎯 Assignment Highlights

✔ RAG Pipeline
✔ Structured LLM Output (Zod validation)
✔ JWT Authentication
✔ Rate Limiting
✔ Logging & Observability
✔ History Tracking

---

## 🏗️ Architecture

User → API → Retrieve Docs (MongoDB) → Inject Context → LLM (Groq) → Structured Response

---

## 🚀 Features

* Retrieval-Augmented Generation (RAG)
* Context-aware AI responses using Groq
* Structured JSON output (Zod validation)
* JWT Authentication (secure endpoints)
* Rate limiting (10 requests/min)
* Logging (userId, latency, confidence)
* History tracking (last 10 queries)

---

## 📂 Project Structure

controllers/
routes/
models/
services/
middleware/

---

## ⚙️ Setup Instructions

### 1. Install dependencies

```bash
npm install
```

### 2. Create `.env` file

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
GROQ_API_KEY=your_groq_key
```

### 3. Seed database

```bash
npm run seed
```

### 4. Run server

```bash
npm start
```

---

## 📡 API Endpoints

### GET /api/docs

Get all documents

### POST /api/auth/register

Register user

### POST /api/auth/login

Login user

### POST /api/ask (Protected)

Ask question

### GET /api/ask/history (Protected)

Get last 10 Q&A history

---

## 🧪 Sample Request

### POST /api/ask

Headers:

```
Authorization: <token>
```

Body:

```json
{
  "question": "What is refund policy?"
}
```

---

## 📦 Sample Response

```json
{
  "answer": "Refunds take 5-7 days",
  "sources": ["doc_id"],
  "confidence": "high"
}
```

---

## 🚦 Rate Limiting

Rate limiting is implemented using express-rate-limit, restricting requests to 10 per minute.

Currently, it is IP-based. In production, it can be extended to per-user rate limiting using Redis or user-based tracking.

---

## 🧠 Key Design Decisions

* Used Groq for fast LLM inference
* Implemented keyword-based retrieval (simple RAG)
* Enforced structured output using Zod
* Prevented hallucinations via strict prompting

---

## ⚠️ Limitations

* Keyword-based search (can be improved using embeddings)
* Rate limiting is IP-based (not per-user persistent)

---

## 🚀 Future Improvements

* Vector database (FAISS / Pinecone)
* Redis-based rate limiting
* Streaming responses
* Frontend UI integration

---

## 👨‍💻 Author

Ashok
GitHub: https://github.com/ash76808
