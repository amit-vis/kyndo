const express = require("express");
const router = express.Router();

router.use("/user", require("./user"));
router.use("/course", require("../model/course"));
router.use("/enroll", require("./enrollment"))

module.exports = router;