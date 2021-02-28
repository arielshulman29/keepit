const express = require("express");
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isMobile } = require("../middleware");
const email = require("../controllers/email");

router.route('/')
    .post(catchAsync(email.sendEmail))
    .get(catchAsync(email.emailSent))

    
module.exports = router;