const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../config/auth');
const mod = require('../models/usersData');


router.get('/', ensureAuth, (req, res) => {
    res.redirect('/home');
})

router.get('/home', ensureAuth, (req, res) => {
    let userId = req.session.userId;
    mod.getUser(userId).then(user => {       
        let imgUrl = user["rows"][0].imageurl;
        let name = user["rows"][0].name;
        let numPost = user["rows"][0].num_posts;
        let numMsg = user["rows"][0].num_messages;
        let numLike = user["rows"][0].num_likes;
        let tagline = user["rows"][0].about;
        //TODO Grab topics from db
        let topics = ["NodeJS", "Java", "SQL", "PHP", "Zend"];
        res.render('home', {imgUrl, name, tagline, numPost, numMsg, numLike, topics})
    });
});

module.exports = router;