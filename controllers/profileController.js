const mod = require("../models/usersData");

exports.getProfile = (req, res) => {
  //TODO Disable ability to message self or increment likes if not own account
  if (req.session.userId != req.params.userId) {
    console.log("Not viewing my own profile");
  }
  mod
    .getUser(req.params.userId)
    .then((data) => {
      let { name, lastname, country, about, id, imageurl } = data["rows"][0];
      let profilePath = `/profile/${id}`;
      res.render("profile", {
        name,
        lastname,
        imageurl,
        country,
        about,
        profilePath,
      });
    })
    .catch((err) =>
      console.log("Error: Problem with rendering profile. ", err)
    );
};

exports.getEditProfile = (req, res) => {
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

exports.edit = (req, res, next) => {
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
