const mod = require('../models/usersData');

exports.getHome = (req, res, next) => {
    let userId = req.session.userId;
    mod.getUser(userId).then(data => {       
        user = {
            imgUrl: data["rows"][0].imageurl,
            name: data["rows"][0].name,
            lastname: data["rows"][0].lastname,
            numPost: data["rows"][0].num_posts,
            numMsg: data["rows"][0].num_messages,
            numLike: data["rows"][0].num_likes,
            tagline: data["rows"][0].about,
            id: data["rows"][0].id
        }
        let profile = user;
        profile["profilePath"] = `/profile/${user.id}`;
        profile["editPath"] = `/profile/${user.id}/edit`;
        profile["topics"] = ["NodeJS", "Java", "SQL", "PHP", "Zend"];
        res.profile = profile;
        next();
    }).catch(err => console.log("Error: Problem with getting user from DB. ", err));
}

