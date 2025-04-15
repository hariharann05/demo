// /api/chat.js
export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Only POST allowed" });
    }
  
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }
  
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct",
          messages: [{ role: "user", content: query }]
        })
      });
  
      const data = await response.json();
      res.status(200).json({ reply: data.choices[0].message.content });
    } catch (err) {
      console.error("OpenRouter error:", err);
      res.status(500).json({ error: "OpenRouter failed" });
    }
  }
  