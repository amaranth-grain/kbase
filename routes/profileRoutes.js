const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../config/auth');
const profileController = require('../controllers/profileController');
const mainController = require('../controllers/mainController');
const discController = require('../controllers/discussionController');


router.get('/profile/:userId', ensureAuth, profileController.getProfile);

router.get('/profile/:userId/edit', profileController.getEditProfile);

router.post('/edit', profileController.edit, mainController.getHome, discController.resetOffset,discController.getLatestDiscussion, discController.formatDatetime, discController.getUserImages, 
discController.getNumOfReplies, discController.loadLatestDiscussions);

module.exports = router;