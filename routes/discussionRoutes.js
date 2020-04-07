const express = require('express');
const router = express.Router();
const { ensureAuth } = require("../config/auth");
const discController = require('../controllers/discussionController');

router.post('/discussion/newReply', 
            ensureAuth, 
            discController.newReply, 
            discController.formatDatetime,
            discController.getUserImages,
            discController.getNumOfReplies,
            discController.getReplies, 
            discController.loadSingleDiscussion);

router.post('/discuss', ensureAuth, discController.discuss);

module.exports = router;