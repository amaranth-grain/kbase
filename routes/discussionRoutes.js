const express = require('express');
const router = express.Router();
const { ensureAuth } = require("../config/auth");
const discController = require('../controllers/discussionController');

router.post('/discussion/newReply', ensureAuth, discController.newReply);

router.post('/discuss', discController.discuss);

module.exports = router;