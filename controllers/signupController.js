const mod = require("../models/usersData");

module.exports = {
  signup: (req, res, next) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const password = req.body.password;
    const password2 = req.body.passwordConfirm;
    if (
      fname != null &&
      lname != null &&
      email != null &&
      password != null &&
      password == password2
    ) {
      // addUsers(name,about,imageurl,dob,country,email,password)
      mod
        .add(fname, "blah", "blah", "blah", "blah", email, password)
        .then((result) => console.log(result))
        .catch((err) => console.log(err));
    } else {
      console.log("Error with inputs");
    }
  },
};
