const { furnitureSchema, roomSchema } = require('./Schemas.js');
const ExpressError = require('./utils/ExpressError');

module.exports.validateFurniture = (req, res, next) => {
    const { error } = furnitureSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else {
        next()
    }
}


module.exports.validateRoom = (req, res, next) => {
    const { error } = roomSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else {
        next()
    }
}


//is the user logged in
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        //in order to redirect the user to the address that he didn't have authorization for after he signs in
        req.session.returnTo = req.originalUrl;
        return res.redirect('user/login');
    }
    next();
}


//is the user is the admin
module.exports.isAdmin = async (req, res, next) => {
    const id = req.user._id;
    const admin = await User.findOne({ _id: id, isAdmin: true })
    if (!admin) {
        req.flash('error', 'אינך מנהל');
        return res.redirect('/edit');
    }
    next();
}

module.exports.isMobile = (req, res, next) => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(req.headers["user-agent"])) {
        res.redirect("/mobilemenu");
    }
    else {
        next();
    }
}

