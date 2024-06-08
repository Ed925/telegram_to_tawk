const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello, this is the Telegram bot webhook server');
});

app.post('/webhook', (req, res) => {
  const message = req.body.message;

  if (message && message.text) {
    console.log(`Received message: ${message.text}`);
    // Process the message and forward it to Tawk.to
    forwardToTawkTo(message.text);
  }

  res.sendStatus(200);
});

function forwardToTawkTo(message) {
  const TAWK_TO_API_URL = 'https://api.tawk.to/v1/message';
  const TAWK_TO_API_KEY = process.env.TAWK_TO_API_KEY; // Access the API key from environment variables

  axios.post(TAWK_TO_API_URL, { message }, {
    headers: {
      'Authorization': `Bearer ${TAWK_TO_API_KEY}`
    }
  })
    .then(response => {
      console.log('Message forwarded to Tawk.to:', response.data);
    })
    .catch(error => {
      console.error('Error forwarding message to Tawk.to:', error);
    });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
