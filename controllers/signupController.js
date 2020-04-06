const mod = require("../models/usersData");

signup = (req, res, next) => {
  let user = {
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password,
    password2: req.body.passwordConfirm,
  };
  // Check for empty inputs
  if (
    user.fname.length == 0 ||
    user.lname.length == 0 ||
    user.email.length == 0 ||
    user.password == 0 ||
    user.password2 == 0
  ) {
    return res.render("landing", { err: "All input fields required." });
  }
  // Check if password inputs are different
  if (user.password != user.password2) {
    return res.render("landing", { err: "Passwords do not match." });
  }
  // Check that email is unique
  mod.checkEmail(user.email).then(data => {
    if (data["rows"][0]["count"] != 0) {
      return res.render("landing", {err: "This e-mail is already registered."});
    }
  }).then(data => {
    mod.createUser(user);
  })
  .then(data => {
    return mod.getId(user.email);
  }).then(data => {
    console.log("User id ", data["rows"][0]["id"]);
    req.session.userId = data["rows"][0]["id"];
    res.render('signup-details', {btnText: "complete registration"});
  })
  .catch(err => {
    console.log("Error: Problem with retrieving number of accounts registered under this e-mail. ", err);
  });
};

signupExtended = (req, res, next) => {
  let user = {
    imgUrl: req.body.imgUrl,
    about: req.body.about,
    country: req.body.country,
    dob: req.body.dob,
  };
  let id = req.session.userId;
  console.log("extend user id sesson ", req.session.userId);
  mod.updateProfile(id, user);
  res.render("landing", {
    msg: "Registration successful!  Log into your account now.",
  });
};

getSignup = (req, res) => {
  res.render('signup-details');
};

module.exports = {
  signup: signup,
  getSignup: getSignup,
  signupExtended: signupExtended,
};
