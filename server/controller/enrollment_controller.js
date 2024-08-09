const Course = require('../model/course');

module.exports.getCourseContent = async (req, res) => {
    const { courseId } = req.params;

    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found." });
        }

        res.status(200).json(course);
    } catch (err) {
        res.status(500).json({ message: "Server error." });
    }
};
