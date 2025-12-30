require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const OpenAI = require("openai");
const path = require("path");

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// API route
app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: userMessage }]
    });

    res.json({
      reply: completion.choices[0].message.content
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      reply: "❌ Error connecting to NandiAi"
    });
  }
});

// Fallback (important)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("NandiAi running on port " + PORT);
});