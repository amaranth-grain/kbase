const mod = require('../models/usersData');

exports.checkUser = function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    let user = mod.check(username, password);
    user.then((result) => {
        if (result.rows.length !== 0) {
            req.session.loggedin = true;
            req.session.username = username;
            res.redirect('/home');
        } else {
            res.redirect('/login');
        }
    }).catch((err) => {
        console.log(err);
    });
}