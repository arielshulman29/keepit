const express = require("express");
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isMobile } = require("../middleware");
const furniture = require("../controllers/furniture");
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, 'p' + Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });
async function uploadThumbnail(req, res, next) {
    try {
        if (req.file) {
            await sharp(req.file.path).resize(50, 50).toFile(req.file.path.replace('uploads/', 'uploads/thumb-'), (err, resizeImage) => {
                if (err) {
                    console.log(err);
                }
            })
        }
        next();
    } catch (error) {
        console.log(error);
    }
}

router.route('/:id')
    .put(upload.single('image'), uploadThumbnail, catchAsync(furniture.editFurniture))
//in case of a request from a mobile device will redirect to mobile menu
//inside the desktop menu there is also reference of "mobile" in case of change of screen size
router.route('/menu')
    .get(isMobile, catchAsync(furniture.furnitureByCategory))

router.route('/mobilemenu')
    .get(catchAsync(furniture.furnitureByCategoryForMobile))

router.route('/delete/:id/:roomid')
    .delete(catchAsync(furniture.deleteFurniture))

router.route('/deleteroom/:id/:roomid')
    .delete(catchAsync(furniture.deleteFurniture))

router.route('/new/furniture')
    .post(upload.single('image'), uploadThumbnail, catchAsync(furniture.createNewFurniture))

router.route('/new/room')
    .post(catchAsync(furniture.createNewRoom))

router.route('/edit')
    .get(catchAsync(furniture.furnitureByCategoryForEdit))

module.exports = router;



