// backend/server.js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    service: "ScamOrSafe API",
  });
});

app.post("/check", (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "No input provided" });
  }

  let risk = 0;
  const indicators = ["giveaway", "profit", "investment", "double", "guaranteed"];

  indicators.forEach(word => {
    if (query.toLowerCase().includes(word)) risk += 20;
  });

  if (query.startsWith("@")) risk += 10;

  res.json({
    input: query,
    riskScore: risk,
    safe: risk < 50,
    message:
      risk < 50
        ? "No known scam indicators"
        : "High-risk scam indicators detected",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`ScamOrSafe API running on port ${PORT}`);
});
