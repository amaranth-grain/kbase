const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.get('/chat', chatController.loadChat);

router.post('/conversation', chatController.loadConversation);

module.exports = router;