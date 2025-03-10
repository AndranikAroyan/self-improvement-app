const express = require('express');
const axios = require('axios');
const app = express();
const port = 5000;

// Enable JSON parsing for POST requests
app.use(express.json());

app.post('/groq', async (req, res) => {
  const { userInput } = req.body;

  try {
    const response = await axios.post(
      'https://api.groq.com/v1/completions',
      {
        model: 'llama', // Use LLaMA model
        messages: [{ role: 'user', content: userInput }],
      },
      {
        headers: {
          Authorization: `Bearer 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`, // Securely use your API key here
          'Content-Type': 'application/json',
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
