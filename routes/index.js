const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home');
})

router.get('/chat', (req, res) => {
    res.render('chat', {chatAssests: true});
})

module.exports = router;