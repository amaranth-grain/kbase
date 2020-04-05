const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../config/auth');
const mainController = require('../controllers/mainController');


router.get('/', ensureAuth, (req, res) => {
    res.redirect('/home');
})

router.get('/home', ensureAuth, mainController.getHome);

router.get('/profile/:userId', mainController.getProfile);

module.exports = router;