const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.get('/chat', chatController.loadChat);

router.post('/chat/loadConversation', chatController.loadConversation);

router.post('/chat/newMessage', chatController.newMessage);

module.exports = router;