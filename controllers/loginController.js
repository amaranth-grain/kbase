const mod = require("../models/usersData");

exports.checkUser = function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  mod
    .check(email, password)
    .then((user) => {
      if (user.rows.length !== 0) {
        req.session.loggedin = true;
        req.session.username = email;
        req.session.userId = user["rows"][0].id;
        req.session.cookie.maxAge = 3600000;
        res.redirect("/home");
      } else {
        res.redirect("/login");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      throw err;
    } else {
      return res.redirect("/");
    }
  });
};
