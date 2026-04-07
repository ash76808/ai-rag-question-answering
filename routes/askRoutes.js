const express = require("express");
const router = express.Router();

const { askQuestion } = require("../controllers/askController");
const auth = require("../middleware/authMiddleware"); // ✅ REQUIRED

router.post("/", auth, askQuestion); // ✅ IMPORTANT

module.exports = router;