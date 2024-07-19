const express = require("express");
const router = express.Router();
const userController = require("../controller/user_controller");
const passport = require("passport");

router.post("/create", userController.create);
router.post("/signin", userController.signin);

module.exports = router;
