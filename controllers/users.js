const User = require("../models/user");
const adminMails = [];
if (process.env.NODE_ENV !== "production") {
    adminMails.push('arielshulmandev@gmail.com');
}
else {
    adminMails.push('Sharon@keepit.co.il', 'Rotem@keepit.co.il');
}

module.exports.renderSigninForm = (req, res) => {
    res.render('user/register');
}

module.exports.renderLoginForm = (req, res) => {
    res.render('user/login');
}

module.exports.loginUser = async (req, res) => {
    const redirectUrl = req.session.returnTo || '/menu';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.signUpUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const isAdmin = adminMails.includes(email);
        const user = new User({ email, username, isAdmin });
        const registeredUser = await User.register(user, password);
        // we are catching the error manually because we can't await isLoggedIn
        req.login(registeredUser, err => {
            if (err) return next(err);
            //if the user was denied access to a url because he wasn't signed in we will redirect him after he 
            //registers- session.returnTo is defined in the middleware
            const redirectUrl = req.session.returnTo || '/menu';
            delete req.session.returnTo;
            req.flash('success', 'ברוכים הבאים למערכת מחשבון אחסנה');
            res.redirect(redirectUrl);
        })
    }
    catch (err) {
        req.flash('error', err.message);
        return res.redirect('/user/register');
    }
}