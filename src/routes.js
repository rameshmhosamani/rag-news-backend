const express = require('express');
const { v4: uuid } = require("uuid");
const rag = require('./rag');
const redis = require('./redis');
const router = express.Router();

// New session
router.get("/session", (req, res) => {
  res.json({ sessionId: uuid() });
});

// Ask question
router.post("/chat", async (req, res) => {
  const { sessionId, message } = req.body;

  await redis.save(sessionId, "user", message);
  const bot = await rag.answer(message);
  await redis.save(sessionId, "bot", bot);

  res.json({ answer: bot });
});

// Get history
router.get("/history/:sessionId", async (req, res) => {
  res.json(await redis.get(req.params.sessionId));
});

// Clear history
router.delete("/history/:sessionId", async (req, res) => {
  await redis.clear(req.params.sessionId);
  res.json({ cleared: true });
});

module.exports = router;
