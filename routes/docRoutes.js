const express = require("express");
const router = express.Router();
const Doc = require("../models/Doc");

router.get("/", async (req, res) => {
  const docs = await Doc.find();
  res.json(docs);
});

module.exports = router;
