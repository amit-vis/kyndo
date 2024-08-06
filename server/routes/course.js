const express = require("express");
const router = express.Router();
const courseController = require("../controller/course_controller");
const passport = require("passport");
const {checkBlacklist} = require("../config/checkblacklist");

router.post("/create", passport.authenticate("tutor-jwt", {session: false}), checkBlacklist, courseController.create);
router.get("/get-course", passport.authenticate("tutor-jwt", {session: false}), checkBlacklist, courseController.getCourse);
router.get("/getsingle-course/:id", passport.authenticate("tutor-jwt", {session: false}), checkBlacklist, courseController.getSingleCourse)

module.exports = router;
