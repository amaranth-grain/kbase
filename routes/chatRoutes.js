const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.get('/chat', chatController.getContacts, chatController.getLatestMessage, chatController.getConvId, chatController.loadConversation);

router.post('/chat', chatController.getContacts, chatController.getLatestMessage, chatController.getConvId, chatController.loadConversation);

// router.post('/chat/newMessage', chatController.newMessage, chatController.getContacts, chatController.getLatestMessage, chatController.loadConversation);

router.post('/chat/newMessage', chatController.newMessage, chatController.getContacts, chatController.getLatestMessage, chatController.loadConversation);

module.exports = router;