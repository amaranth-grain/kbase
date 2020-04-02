const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../config/auth');

router.get('/', ensureAuth, (req, res) => {
    res.redirect('/home');
})

router.get('/home', ensureAuth, (req, res) => {
    res.render('home');
})

module.exports = router;