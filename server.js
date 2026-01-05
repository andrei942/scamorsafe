const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    service: "ScamOrSafe API",
    version: "1.0"
  });
});

app.post("/check", (req, res) => {
  const { value } = req.body;

  if (!value) {
    return res.status(400).json({ error: "No value provided" });
  }

  res.json({
    input: value,
    riskScore: 0,
    verdict: "No known scam indicators"
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
