const express = require("express");
const router = express.Router();
const courseController = require("../controller/course_controller");
const passport = require("passport");
const {checkBlacklist} = require("../config/checkblacklist")

router.post("/create", passport.authenticate("tutor-jwt", {session: false}), checkBlacklist, courseController.create);

module.exports = router;
