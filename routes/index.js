const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../config/auth');
const mod = require('../models/usersData');


router.get('/', ensureAuth, (req, res) => {
    res.redirect('/home');
})

router.get('/home', ensureAuth, (req, res) => {
    let userId = req.session.userId;
    mod.getUser(userId).then(data => {       
        user = {
            imageurl: data["rows"][0].imageurl,
            name: data["rows"][0].name,
            lastname: data["rows"][0].lastname,
            num_posts: data["rows"][0].num_posts,
            num_messages: data["rows"][0].num_messages,
            num_likes: data["rows"][0].num_likes,
            about: data["rows"][0].about,
            id: data["rows"][0].id
        }
        let profilePath = `/profile/${user.id}`
        let {imageurl, name, lastname, num_posts, num_messages, num_likes, about, id} = user;
        let topics = ["NodeJS", "Java", "SQL", "PHP", "Zend"];
        res.render('home', {imageurl, name, lastname, num_posts, num_messages, num_likes, about, profilePath, topics})
    });
});

router.get('/profile/:userId', (req, res) => {
    mod.getUser(req.params.userId).then(data => {
        let {name, lastname, country, about, id, imageurl} = data["rows"][0];
        let profilePath = `/profile/${id}`;
        console.log("profile info: ", name, lastname, country, about, profilePath, imageurl);
        res.render('profile', {name, lastname, imageurl, country, about, profilePath});
    });
})

module.exports = router;