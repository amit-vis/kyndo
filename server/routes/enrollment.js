const express = require("express");
const router = express.Router();
const courseController = require("../controller/course_controller");
const ensureEnrollment = require("../middleware/ensureEnrollment");

router.get("/course-content/:courseId", ensureEnrollment, courseController.getCourseContent);

module.exports = router;
