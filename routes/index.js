const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../config/auth');
const mod = require('../models/usersData');
const discController = require('../controllers/discussionController');

router.get('/', ensureAuth, (req, res) => {
    res.redirect('/home');
})

function temp(req,res,next) {
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
        res.profile = {"imgUrl": imgUrl, "name": name, "numPost": numPost, 
                        "numMsg": numMsg, "numLike": numLike, "tagline": tagline}
        next();
    }).catch((err) => console.log(err));
}

router.get('/home', ensureAuth, temp, discController.getLatestDiscussion, discController.formatDatetime, discController.getUserImages, 
                    discController.getNumOfReplies, discController.getReplies, discController.loadLatestDiscussions);

router.post('/discussion/newReply', discController.newReply);

module.exports = router;