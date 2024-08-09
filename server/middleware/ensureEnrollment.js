const Enrollment = require('../model/enrollment');

const ensureEnrollment = async (req, res, next) => {
    const { userId } = req.user; 
    const { courseId } = req.params;

    try {
        const enrollment = await Enrollment.findOne({ user: userId, course: courseId });

        if (!enrollment) {
            return res.status(403).json({ message: "Access denied. You are not enrolled in this course." });
        }

        next();
    } catch (err) {
        res.status(500).json({ message: "Server error." });
    }
};

module.exports = ensureEnrollment;
