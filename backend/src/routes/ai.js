const router = require('express').Router();

router.post('/generate-response', async (req, res) => {
  const { title, price, city, rooms, size_sqm } = req.body;

  const prompt = `Schreibe ein höfliches und professionelles Bewerbungsschreiben für folgende Mietwohnung:
- Titel: ${title}
- Stadt: ${city}
- Preis: ${price ? price + ' €' : 'nicht angegeben'}
- Zimmer: ${rooms || 'nicht angegeben'}
- Größe: ${size_sqm ? size_sqm + ' m²' : 'nicht angegeben'}

Das Schreiben soll auf Deutsch sein, höflich klingen, max 150 Wörter haben und mit "Mit freundlichen Grüßen" enden. Schreibe NUR den Brief.`;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 400,
      }),
    });
    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;
    if (!text) return res.status(500).json({ error: JSON.stringify(data) });
    res.json({ message: text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;