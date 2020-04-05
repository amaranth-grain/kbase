const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const { forwardAuth } = require('../config/auth');

/*If the user is logged in, direct them to the homepage.
If not, direct them to the landing page to login or signup.*/
router.get('/login', forwardAuth, (req, res) => {
    res.render('landing');
})
/* Attempt to login by comparing user and pw against db values. */
router.post('/login', loginController.checkUser);

router.post('/logout', loginController.logout);
 
module.exports = router;
