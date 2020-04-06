const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../config/auth');
const mainController = require('../controllers/mainController');
const discController = require('../controllers/discussionController');


router.get('/', ensureAuth, (req, res) => {
    res.redirect('/home');
})

router.get('/home', ensureAuth, mainController.getHome, discController.getLatestDiscussion, discController.formatDatetime, discController.getUserImages, 
                    discController.getNumOfReplies, discController.loadLatestDiscussions);

router.get('/profile/:userId', mainController.getProfile);

module.exports = router;