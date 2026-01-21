import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/ai-response", async (req, res) => {
  const { message, name } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          {
            role: "system",
            content:
              "Sos un asistente profesional para un sitio web de servicios digitales. Respondé de forma clara, amable y breve.",
          },
          {
            role: "user",
            content: `Nombre: ${name}. Mensaje: ${message}`,
          },
        ],
        max_tokens: 100,
      }),
    });

    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: "Error al generar respuesta IA" });
  }
});

app.listen(3000, () => {
  console.log("Servidor IA corriendo en puerto 3000");
});
