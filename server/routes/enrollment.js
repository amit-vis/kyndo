const express = require("express");
const router = express.Router();
const enrollnmentController = require("../controller/enrollment_controller");
const passport = require("passport");
const { checkBlacklist } = require("../config/checkblacklist");

router.post("/:id", passport.authenticate("user-jwt", {session: false}), checkBlacklist, enrollnmentController.enroll);
router.get("/getCourse",passport.authenticate("user-jwt", {session: false}), checkBlacklist, enrollnmentController.getEnrollCourse);
router.get("/enroll-Count/:id", enrollnmentController.enrollnmentCount);

module.exports = router;
