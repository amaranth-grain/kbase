const mod = require('../models/usersData');

exports.checkUser = function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    let user = mod.check(email, password);
    user.then((result) => {
        if (result.rows.length !== 0) {
            req.session.loggedin = true;
            req.session.username = email;
            res.redirect('/home');
        } else {
            res.redirect('/login');
        }
    }).catch((err) => {
        console.log(err);
    });
}