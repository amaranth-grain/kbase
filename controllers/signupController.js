const mod = require("../models/usersData");

module.exports = {
  signup: (req, res, next) => {
    let user = {
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.passwordConfirm,
      about: "I am me",
      imageurl: "https://randomuser.me/api/portraits/med/women/85.jpg",
      dob: Date(),
      country: "Canada",
    };
    if (
      user.fname != null &&
      user.lname != null &&
      user.email != null &&
      user.password != null &&
      user.password == user.password2
    ) {
      console.log(user.fname, user.email, user.password);
      mod.createCredentials(user);
      res.redirect(301, '/signup');
      // addUsers(name,about,imageurl,dob,country,email,password)
      // mod
      //   .add(fname, "blah", "blah", "blah", "blah", email, password)
      //   .then((result) => console.log(result))
      //   .catch((err) => console.log(err));
    } else {
      console.log("Error with inputs");
    }
  },
};
