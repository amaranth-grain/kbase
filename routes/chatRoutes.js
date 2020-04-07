const express = require('express');
const router = express.Router();
const { ensureAuth } = require("../config/auth");
const chatController = require('../controllers/chatController');

router.get('/chat', ensureAuth, chatController.getContacts, chatController.getLatestMessage, chatController.getConvId, chatController.loadConversation);

router.post('/chat', ensureAuth, chatController.getContacts, chatController.getLatestMessage, chatController.getConvId, chatController.loadConversation);

router.post('/chat/newMessage', ensureAuth, chatController.newMessage);

router.post('/chat/messageProfile', ensureAuth, chatController.renderMessageProfile);

router.post('/chat/newContact', ensureAuth, chatController.createConv, chatController.createMessage, chatController.sendEmail);

module.exports = router;