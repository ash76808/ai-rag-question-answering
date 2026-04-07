const { getRelevantDocs } = require("../services/ragService");
const { askLLM } = require("../services/llmService");
const { z } = require("zod");
const History = require("../models/History");

// ✅ Zod schema for structured response
const responseSchema = z.object({
  answer: z.string(),
  sources: z.array(z.string()),
  confidence: z.string()
});

exports.askQuestion = async (req, res) => {
  try {
    const { question } = req.body;

    // ✅ Validate input
    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    // ✅ Retrieve relevant documents
    const docs = await getRelevantDocs(question);

    if (docs.length === 0) {
      return res.json({
        answer: "I don't know based on provided documents",
        sources: [],
        confidence: "low"
      });
    }

    // ✅ Call LLM with context
    const result = await askLLM(question, docs);

    let parsed;

    try {
      const json = JSON.parse(result);

      // ✅ Enforce schema (important for assignment)
      parsed = responseSchema.parse({
        ...json,
        sources: docs.map(d => d._id.toString())
      });

    } catch (err) {
      // ✅ Fallback if LLM returns invalid JSON
      parsed = {
        answer: result,
        sources: docs.map(d => d._id.toString()),
        confidence: "medium"
      };
    }

    // ✅ Confidence based on retrieval quality
    let confidence = "low";
    if (docs.length === 1) confidence = "medium";
    if (docs.length >= 2) confidence = "high";

    parsed.confidence = confidence;

    // ✅ Pass confidence to logging middleware
    res.locals.confidence = parsed.confidence;

    // ✅ Save history (bonus feature)
    await History.create({
      userId: req.user.id || "unknown",
      question,
      answer: parsed.answer
    });

    // ✅ Final response
    res.json(parsed);

  } catch (error) {
    console.error("ASK ERROR:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};