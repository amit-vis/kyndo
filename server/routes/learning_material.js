const express = require("express");
const router = express.Router();
const learningMaterialController = require("../controller/learning_material_controller");
const passport = require("passport");
const {checkBlacklist} = require("../config/checkblacklist");


router.post("/create/:id",passport.authenticate("tutor-jwt", {session: false}), checkBlacklist ,learningMaterialController.create);

module.exports = router;
