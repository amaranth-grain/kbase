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
    //TODO Disable ability to message self or increment likes if not own account
    if (req.session.userId != req.params.userId) {
        console.log("Not viewing my own profile");
    }
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
                let date = new Date(Date.parse(element.datetime + "+0000"));
                element.date = `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()} ${date.getFullYear()}`;
            })
            res.render('profile', {name, lastname, imageurl, country, id, about, profilePath, discussion: discussions});
        }).catch((err) => console.log(err));

    }).catch((err) => console.log(err));
}

getEditProfile = (req, res) => {
    //Redirect user to homepage if they attempt to visit edit profile page of another user
    if (req.session.userId != req.params.userId) {
      return res.redirect("/home");
    }
    mod
      .getUser(req.params.userId)
      .then((data) => {
        let { name, lastname, country, about, id, imageurl } = data["rows"][0];
        let btnText = "update profile";
        res.render("edit-profile", {
          name,
          lastname,
          imageurl,
          country,
          about,
          btnText,
        });
      })
      .catch((err) =>
        console.log("Error: Problem with rendering edit profile page. ", err)
      );
  };
  
edit = (req, res, next) => {
    let id = req.session.userId;
    let user = {
      imgUrl: req.body.imgUrl,
      about: req.body.about,
      country: req.body.country,
      dob: req.body.dob,
    };
    mod.updateProfile(id, user);
    next();
  };

module.exports = {
    getProfile,
    getHome,
    edit,
    getEditProfile
}
