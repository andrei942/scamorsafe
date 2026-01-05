const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "ScamOrSafe backend is running"
  });
});

// Scam check endpoint
app.post("/api/check", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({
      success: false,
      message: "No text provided"
    });
  }

  // Simple demo logic (we improve later)
  const scamKeywords = [
    "guaranteed",
    "double your money",
    "crypto giveaway",
    "send first",
    "limited time",
    "telegram betting"
  ];

  const isScam = scamKeywords.some(word =>
    text.toLowerCase().includes(word)
  );

  res.json({
    success: true,
    scam: isScam,
    analyzedText: text
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
