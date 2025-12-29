import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 10000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// HEALTH CHECK
app.get("/", (req, res) => {
  res.send("NandiAI backend running 🚀");
});

// CHAT API
app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({ error: "No message provided" });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: userMessage
      })
    });

    const data = await response.json();

    const reply =
      data.output?.[0]?.content?.[0]?.text ||
      "Sorry, I couldn't reply.";

    res.json({ reply });

  } catch (err) {
    console.error("AI ERROR:", err);
    res.status(500).json({ error: "AI server error" });
  }
});

// START SERVER
app.listen(PORT, () => {
  console.log(`NandiAI running on port ${PORT}`);
});
    const reply = data.output_text || "⚠️ No AI response";

    res.json({ reply });

  } catch (err) {
    console.error(err);
    res.json({ reply: "❌ Server error" });
  }
});

app.listen(PORT, () => {
  console.log("NandiAI running on port", PORT);
});
