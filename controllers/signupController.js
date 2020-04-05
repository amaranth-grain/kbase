const mod = require("../models/usersData");

signup = (req, res, next) => {
  let user = {
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password,
    password2: req.body.passwordConfirm
  };
  //TODO Check email is unique
  if (user.fname.length != 0 &&
    user.lname.length != 0 &&
    user.email.length != 0 &&
    user.password == user.password2) {
      mod.createUser(user);
      mod.getId(user.email).then(data => {
        req.session.userId = data["rows"][0]["id"];
        console.log("res locals user id", res.locals.userId);
        res.redirect('/signup');
      });
  } else {
    console.log("Input validation failed.");
  }
};

signupExtended = (req, res, next) => {
    let user = {
      imgUrl: req.body.imgUrl,
      about: req.body.about,
      country: req.body.country,
      dob: req.body.dob
    }
    let id = req.session.userId;
    console.log("extend user id sesson ", id);
    mod.updateProfile(id, user);
    res.render('landing', {msg: "Registration successful!  Log into your account now."})
};

module.exports = {
  signup: signup,
  signupExtended: signupExtended,
};
