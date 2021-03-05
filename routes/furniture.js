const express = require("express");
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isMobile } = require("../middleware");
const furniture = require("../controllers/furniture");
//in case of a request from a mobile device will redirect to mobile menu
//inside the desktop menu there is also reference of "mobile" in case of change of screen size
router.route('/menu')
    .get(isMobile, catchAsync(furniture.furnitureByCategory))

router.route('/mobilemenu')
    .get(catchAsync(furniture.furnitureByCategoryForMobile))

module.exports = router;



