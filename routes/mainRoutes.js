const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../config/auth');
const mainController = require('../controllers/mainController');
const discController = require('../controllers/discussionController');


router.get('/', ensureAuth, (req, res) => {
    res.redirect('/home');
})

router.get('/home', ensureAuth, mainController.getHome, discController.resetOffset,discController.getLatestDiscussion, discController.formatDatetime, discController.getUserImages, 
                    discController.getNumOfReplies, discController.loadLatestDiscussions);

router.get('/nextPage', ensureAuth,mainController.getHome, discController.incrementOffset,discController.getLatestDiscussion, discController.formatDatetime, discController.getUserImages, 
discController.getNumOfReplies,discController.loadLatestDiscussions);

router.get('/previousPage', ensureAuth,mainController.getHome, discController.decrementOffset,discController.getLatestDiscussion, discController.formatDatetime, discController.getUserImages, 
discController.getNumOfReplies,discController.loadLatestDiscussions);

router.get('/profile/:userId', ensureAuth, mainController.getProfile);

router.get('/profile/:userId/edit', mainController.getEditProfile);

router.post('/edit', mainController.edit, mainController.getHome, discController.resetOffset,discController.getLatestDiscussion, discController.formatDatetime, discController.getUserImages, 
discController.getNumOfReplies, discController.loadLatestDiscussions);

module.exports = router;