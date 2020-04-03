module.exports = {
    ensureAuth: function (req, res, next) {
        if (req.session.loggedin !== true) {
            res.redirect('/login');
        } else {
            next();
        }
    },
    forwardAuth: function (req, res, next) {
        if (req.session.loggedin === true) {
            res.redirect('/home');
        } else {
            next();
        }
    }
};