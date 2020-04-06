const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signupController');
const { forwardAuth } = require('../config/auth');

router.get('/signup', forwardAuth, signupController.getSignup);

router.post('/signup', signupController.signup);

router.post('/signup-extended', signupController.signupExtended);

module.exports = router;