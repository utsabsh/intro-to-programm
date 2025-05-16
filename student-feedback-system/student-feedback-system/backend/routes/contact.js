// routes/contact.js
const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/contactMessage');

// @route   POST /api/contact
// @desc    Handle contact form submission
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newMessage = new ContactMessage({ name, email, subject, message });
    await newMessage.save();

    res.status(200).json({ message: 'Message received. Thank you for contacting us!' });
  } catch (err) {
    console.error('Error saving contact message:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
