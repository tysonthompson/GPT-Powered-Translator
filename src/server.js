const express = require('express');
const cors = require('cors');
const { translate_to_french } = require('./translate'); // Import your translation function here

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/translate', async (req, res) => {
  const text = req.body.text;

  if (!text) {
    return res.status(400).json({ error: 'Text input is required.' });
  }

  const translatedText = await translate_to_french(text);
  res.json({ translatedText });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
