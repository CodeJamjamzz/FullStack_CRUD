import axios from 'axios'; 
import env from 'dotenv'

env.config()

export const getSummary = async (req, res) => {
  const { essay } = req.body;

  try {
    console.log('error')
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'deepseek/deepseek-r1-0528-qwen3-8b:free',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `In sentences paragraphs, could you give me a summary of this text: ${essay}`
              }
            ]
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.APIKEY}`,
          'HTTP-Referer': 'http://localhost:3000', // optional
          'X-Title': 'MyApp', // optional
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log(response.data);
    const summary = response.data.choices[0].message.content;
    res.json({ summary });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get summary' });
  }
};

