const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const OpenAI = require('openai');

// echo your own environment variables into the .env file/create one if needed. 
// dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const openai = new OpenAI

// Serve static files from the "public" directory
app.use(express.static('public'));

app.post('/submit', async (req, res) => {
  const userInput = req.body.prompt; // Access the user input from the request body
  console.log(`User input: ${userInput}`);

  try {
    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "assistant", content: userInput }],
      stream: true,
    });

    let apiResponse = '';
    for await (const chunk of stream) {
      apiResponse += chunk.choices[0]?.delta?.content || "";
    }

    // Send the response back to the client as JSON
    res.json({ apiResponse });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

app.get('/api-key', (req, res) => {
  res.send(process.env.API_KEY);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
