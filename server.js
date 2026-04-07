require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ RATE LIMIT (IMPORTANT)
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 min
  max: 10 // 10 requests per minute
});
app.use("/api/ask", limiter);

// ✅ LOGGING (IMPORTANT)
app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    console.log({
      userId: req.user?.id || "guest",
      question: req.body?.question?.slice(0, 50),
      latencyMs: Date.now() - start,
      confidence: res.locals?.confidence || "N/A"
    });
  });

  next();
});

// ✅ ROUTES
app.use("/api/docs", require("./routes/docRoutes"));
app.use("/api/ask", require("./routes/askRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/ask/history", require("./routes/historyRoutes"));

// ✅ ERROR HANDLER (IMPORTANT)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong" });
});

// ✅ DB CONNECT
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(5000, () => console.log("Server running on 5000"));
  })
  .catch(err => console.log(err));