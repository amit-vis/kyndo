const express = require("express");
const router = express.Router();
const userController = require("../controller/user_controller");
const passport = require("passport");
const {checkBlacklist} = require("../config/checkblacklist")

router.post("/create", userController.create);
router.post("/signin", userController.signin);
router.get('/view-user', passport.authenticate('user-jwt', { session: false }),checkBlacklist, userController.getDetails);

// Route for tutor details
router.get('/view-tutor', passport.authenticate('tutor-jwt', { session: false }),checkBlacklist, userController.getDetails);
router.post("/logout", userController.logout); // Added logout route

module.exports = router;
