const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");
require("dotenv").config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// OpenAI API yapılandırması
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/api/quote", async (req, res) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Mutlu olmam için bir neden yaz:" }],
      max_tokens: 50,
      temperature: 0.7,
    });

    // OpenAI API yanıtını kontrol et
    if (response && response.choices && response.choices.length > 0) {
      const quote = response.choices[0].message.content.trim();
      res.json({ reason: quote });
    } else {
      throw new Error("Geçerli bir yanıt alınamadı.");
    }
  } catch (error) {
    console.error("OpenAI API hatası:", error.message);
    res
      .status(500)
      .json({ error: "Bir şeyler yanlış gitti. Lütfen tekrar deneyin." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
