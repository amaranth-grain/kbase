const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.get('/chat', chatController.getContacts, chatController.getLatestMessage, chatController.getConvId, chatController.loadConversation);

router.post('/chat', chatController.getContacts, chatController.getLatestMessage, chatController.getConvId, chatController.loadConversation);

router.post('/chat/newMessage', chatController.newMessage);

router.post('/chat/messageProfile', chatController.renderMessageProfile);

router.post('/chat/newContact', chatController.createConv, chatController.createMessage, chatController.sendEmail);

module.exports = router;