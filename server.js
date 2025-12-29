import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Test route
app.get("/api", (req, res) => {
  res.json({ status: "NandiAI backend running 🚀" });
});

// Chat API
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.json({ reply: "❌ Empty message" });
  }

  try {
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
      data.output_text ||
      "⚠️ No reply from AI";

    res.json({ reply });
  } catch (err) {
    res.json({ reply: "❌ Server error" });
  }
});

app.listen(PORT, () => {
  console.log("NandiAI running on port", PORT);
});    const data = await openaiRes.json();

    if (!data.output_text) {
      return res.status(500).json({ error: "No AI response" });
    }

    res.json({ reply: data.output_text });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`NandiAI running on port ${PORT}`);
});
