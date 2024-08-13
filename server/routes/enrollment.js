const express = require("express");
const router = express.Router();
const enrollnmentController = require("../controller/enrollment_controller");
const passport = require("passport");
const { checkBlacklist } = require("../config/checkblacklist");

router.post("/:id", passport.authenticate("user-jwt", {session: false}), checkBlacklist, enrollnmentController.enroll)
router.get("/getCourse", enrollnmentController.getEnrollCourse)


module.exports = router;
