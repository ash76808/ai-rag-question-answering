const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

async function askLLM(question, docs) {
  const context = docs.map(d => d.content).join("\n");

  const prompt = `
You are a strict AI.

ONLY answer from context.
If not found, say "I don't know".

Return ONLY JSON:
{
  "answer": "",
  "sources": [],
  "confidence": "high | medium | low"
}

Context:
${context}

Question:
${question}
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }]
  });

  return response.choices[0].message.content;
}

module.exports = { askLLM };