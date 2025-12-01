import express from 'express';
const router = express.Router();

// Simple rule-based response (you can improve this later)
router.post('/', (req, res) => {
  const { message } = req.body;

  let reply = "Sorry, I didn't understand that.";

  if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
    reply = "Hello! 👋 How can I assist you today?";
  } else if (message.toLowerCase().includes('price')) {
    reply = "Prices vary by product. Check out our Collection page for more!";
  } else if (message.toLowerCase().includes('return')) {
    reply = "We accept returns within 7 days of delivery. 📦";
  } else if (message.toLowerCase().includes('order')) {
    reply = "To track your order, visit the Orders page after logging in.";
  } else if (message.toLowerCase().includes('payment')) {
    reply = "We accept UPI, Credit Card, and Net Banking. 💳";

  }

  return res.json({ reply });
});

export default router;
