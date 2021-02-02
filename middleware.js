const { furnitureSchema, roomSchema } = require('./Schemas.js');
const ExpressError = require('./utils/ExpressError');
const Furniture = require('./models/furniture');
const Room = require('./models/room');

//are the data we got for the campground valid
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

module.exports.isMobile = (req, res, next) => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(req.headers["user-agent"])){
        res.redirect("/mobilemenu");
    }
    else{
        next();
    }
}

