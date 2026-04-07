const Doc = require("../models/Doc");

async function getRelevantDocs(question) {
  const docs = await Doc.find();

  return docs.filter(doc =>
    question.toLowerCase().includes(doc.title.toLowerCase())
  ).slice(0, 3);
}

module.exports = { getRelevantDocs };
