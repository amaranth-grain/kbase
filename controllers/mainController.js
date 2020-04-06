const mod = require('../models/usersData');
const mod2 = require('../models/discussionData');


function getHome(req,res,next) {
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

function getProfile(req,res,next) {
    var id = req.params.userId;
    var profile;
    var profilePath;
    var discussions;
    mod.getUser(id).then(data => {
        profile = data["rows"][0];
        profilePath = `/profile/${id}`;
    }).then(()=>{
        mod2.getDiscussionsByUser(id).then(data => {
            var {name, lastname, country, about, id, imageurl} = profile;
            discussions = data.rows;
            discussions.forEach((element) => {
                element.imageurl = imageurl;
            })
            res.render('profile', {name, lastname, imageurl, country, id, about, profilePath, discussion: discussions});
        }).catch((err) => console.log(err));

    }).catch((err) => console.log(err));
}

module.exports = {
    getProfile: getProfile,
    getHome: getHome,
}
