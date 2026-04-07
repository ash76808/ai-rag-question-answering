# 🚀 Smart Q&A API (RAG + Groq LLM)

A production-ready backend system that implements a **Retrieval-Augmented Generation (RAG)** pipeline using **Node.js, Express, MongoDB, and Groq LLM**.

This API retrieves relevant documents from a database and generates **grounded, context-aware answers** with structured JSON output.

---

# 📌 Overview

This project solves the problem of **retrieving accurate information from unstructured data** by:

1. Retrieving relevant documents from MongoDB
2. Injecting them into an LLM prompt
3. Generating **strict, context-based responses**
4. Returning structured output

---

# 🧠 Features

* ✅ RAG (Retrieval-Augmented Generation)
* ✅ Groq LLM Integration
* ✅ MongoDB Document Store
* ✅ JWT Authentication
* ✅ Rate Limiting (10 req/min/user)
* ✅ Structured JSON Output (Zod validation)
* ✅ Smart Confidence Scoring
* ✅ Observability (logging: userId, latency, confidence)
* ✅ Global Error Handling
* ⭐ Bonus: Ask History API

---


## 🏗️ Architecture

User → API → Retrieve Docs (MongoDB) → Inject Context → LLM (Groq) → Structured Response

# 🏗️ Project Structure

```
codemaya/
│
├── controllers/
│   ├── askController.js
│   ├── authController.js
│
├── routes/
│   ├── askRoutes.js
│   ├── authRoutes.js
│   ├── docRoutes.js
│   ├── historyRoutes.js
│
├── services/
│   ├── ragService.js
│   ├── llmService.js
│
├── models/
│   ├── Doc.js
│   ├── User.js
│   ├── History.js
│
├── middleware/
│   ├── authMiddleware.js
│
├── config/
├── utils/
│
├── seed.js
├── server.js
├── package.json
├── .env
├── .env.example
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone <your-repo-link>
cd codemaya
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Environment Variables

Create a `.env` file:

```
MONGO_URI=mongodb://127.0.0.1:27017/codemaya
JWT_SECRET=your_secret_key
GROQ_API_KEY=your_groq_api_key
```

---

## 4️⃣ Seed Database

```bash
npm run seed
```

---

## 5️⃣ Run Server

```bash
npm start
```

Server runs at:

```
http://localhost:5000
```

---

# 🔑 Groq Model Information

## ✅ Working Models (Tested)

* `llama-3.1-8b-instant` ✅ (USED IN THIS PROJECT)
* `mixtral-8x7b-32768` ✅ (optional)

---

## ❌ Deprecated / Not Working

* `llama3-8b-8192` ❌ (decommissioned)
* `llama3-70b-8192` ❌ (decommissioned)

👉 If model errors occur, update to latest from:
https://console.groq.com/docs/models

---

# 📡 API Endpoints

---

## 📄 GET /api/docs

Get all documents

---

## 🔐 POST /api/auth/register

```json
{
  "email": "test@gmail.com",
  "password": "123456"
}
```

---

## 🔐 POST /api/auth/login

```json
{
  "email": "test@gmail.com",
  "password": "123456"
}
```

Response:

```json
{
  "token": "JWT_TOKEN"
}
```

---

## 🤖 POST /api/ask (Protected)

### Headers:

```
Authorization: <token>
```

### Body:

```json
{
  "question": "What is refund policy?"
}
```

---

### Response:

```json
{
  "answer": "Refunds take 5-7 days",
  "sources": ["doc_id"],
  "confidence": "high"
}
```

---

## 📜 GET /api/ask/history (Protected)

Returns last 10 Q&A:

```json
[
  {
    "question": "...",
    "answer": "...",
    "createdAt": "..."
  }
]
```

---

# 🧠 RAG Pipeline Flow

```
User Question
      ↓
Retrieve Documents (MongoDB)
      ↓
Inject into Prompt
      ↓
Groq LLM
      ↓
Structured JSON Response
```

---

## 🚦 Rate Limiting

Rate limiting is implemented using express-rate-limit, restricting requests to 10 per minute.

Currently, it is IP-based. In production, this can be extended to per-user rate limiting using Redis or userId-based tracking.

# 🔐 Security Features

* JWT Authentication
* Protected endpoints
* Password hashing (bcrypt)
* Rate limiting (10 req/min/user)

---

# 📊 Observability

Each `/api/ask` request logs:

```json
{
  "userId": "...",
  "question": "...",
  "latencyMs": 120,
  "confidence": "high"
}
```

---

# ⚠️ Error Handling

* Global error handler
* No raw stack traces in production
* Safe fallback responses

---

# 📈 Confidence Logic

Confidence is derived from retrieval quality:

* `low` → no or weak match
* `medium` → 1 relevant doc
* `high` → multiple relevant docs

---

# 🧪 Testing

Use:

* Postman
* Thunder Client

---

# 🧾 .env.example

```
MONGO_URI=
JWT_SECRET=
GROQ_API_KEY=
```

---

# 🎯 Assignment Compliance

| Requirement             | Status |
| ----------------------- | ------ |
| RAG pipeline            | ✅      |
| Structured output       | ✅      |
| Auth + Rate limit       | ✅      |
| Logging + Observability | ✅      |
| Error handling          | ✅      |
| README clarity          | ✅      |

---

# 🚀 Future Improvements

* Vector Search (Embeddings)
* Redis-based rate limiting
* Docker deployment
* Frontend UI integration

---

# 👨‍💻 Author

Ashok Maddhuru
Generative AI Engineer
----------------------

🔥 This project demonstrates production-level backend + LLM integration skills.
