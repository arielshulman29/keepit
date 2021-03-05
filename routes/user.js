const express = require("express");
const router = express.Router();
const passport = require("passport");
const { renderLoginForm, loginUser, renderSigninForm, signUpUser } = require("../controllers/users");

router.route('/register')
    .get(renderSigninForm)
    .post(signUpUser)

router.route('/login')
    .get(renderLoginForm)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/user/login' }),
        loginUser)

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/user/login');
})

module.exports = router;