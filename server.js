require("dotenv").config();
const express = require("express");
const path = require("path");
const OpenAI = require("openai");

const app = express();

app.use(express.json());

// ✅ Serve static files
app.use(express.static(path.join(__dirname, "public")));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// ✅ API
app.post("/api/chat", async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are NandiAi, a helpful AI assistant." },
        { role: "user", content: req.body.message }
      ]
    });

    res.json({
      reply: completion.choices[0].message.content
    });
  } catch (err) {
    console.error(err);
    res.json({ reply: "AI error" });
  }
});

// ✅ IMPORTANT: fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("NandiAi running on port", PORT);
});      reply: "❌ Error connecting to NandiAi"
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
