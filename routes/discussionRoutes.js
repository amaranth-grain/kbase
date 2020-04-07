const express = require('express');
const router = express.Router();
const discController = require('../controllers/discussionController');

router.post('/discussion/newReply',discController.newReply);

router.post('/discuss', discController.discuss);

module.exports = router;