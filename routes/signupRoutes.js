const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signupController');
const { forwardAuth } = require('../config/auth');

router.get('/signup', forwardAuth, (req, res) => {
    res.render('signup-details');
})

router.post('/signup', signupController.signup);

module.exports = router;