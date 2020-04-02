const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const { ensureAuth, forwardAuth } = require('../config/auth');

router.get('/login', forwardAuth, (req, res) => {
    res.render('landing');
})

router.post('/login', loginController.checkUser);

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            throw err;
        } else {
            return res.redirect('/');
        }
    })
})

module.exports = router;
