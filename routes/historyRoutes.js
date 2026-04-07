const express = require("express");
const router = express.Router();

// ✅ correct path (IMPORTANT)
const History = require("../models/History");

// ✅ JWT middleware
const auth = require("../middleware/authMiddleware");

// ✅ Get last 10 Q&A history
router.get("/", auth, async (req, res) => {
  try {
    const history = await History.find({ userId: req.user.id })
      .sort({ createdAt: -1 }) // latest first
      .limit(10);

    res.json(history);

  } catch (error) {
    console.error("HISTORY ERROR:", error);
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

module.exports = router;