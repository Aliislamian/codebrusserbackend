const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Send message
router.post('/api/messages/send', messageController.sendMessage);

// Get messages between two users
router.get('/api/messages/:senderId/:receiverId', messageController.getMessages);

module.exports = router;
