const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Telegram Bot Token
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

// Endpoint for Telegram Webhook
app.post('/telegram-webhook', async (req, res) => {
    const chatId = req.body.message.chat.id;
    const message = req.body.message.text;

    // Send message to Tawk.to
    await sendMessageToTawk(message);

    // Send acknowledgment to Telegram
    await sendMessageToTelegram(chatId, 'Your message has been received and forwarded to Tawk.to support.');

    res.sendStatus(200);
});

// Function to send message to Tawk.to
async function sendMessageToTawk(message) {
    // You need to implement the function to send message to Tawk.to
    // using Tawk.to API or other integration method.
}

// Function to send message to Telegram
async function sendMessageToTelegram(chatId, text) {
    await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
        chat_id: chatId,
        text: text
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
