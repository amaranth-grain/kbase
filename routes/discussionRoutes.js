const express = require('express');
const router = express.Router();
const discController = require('../controllers/discussionController');

router.post('/discussion/newReply',discController.newReply);

module.exports = router;