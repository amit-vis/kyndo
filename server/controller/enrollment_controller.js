const Course = require('../model/course');
const Enrollment = require("../model/enrollment");

module.exports.enroll = async (req, res)=>{
    try {
        const course = await Course.findById(req.params.id);
        if(!course){
            return res.status(400).json({
                message: "Course not available or not found!",
                success: false
            })
        }
        let enrollnment = await Enrollment.findOne({course: course._id, user: req.user._id});
        if(enrollnment){
            return res.status(401).json({
                message: "You have already Enrolled",
                success: false
            })
        }
        enrollnment = await Enrollment.create({
            user: req.user._id,
            course: course._id
        })

        return res.status(200).json({
            message: "you have enrolled successfully!",
            success: true,
            enrollnment
        })
        
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error in enrolling the course",
            error: error.message
        })
    }
}

module.exports.getEnrollCourse = async (req, res)=>{
    try {
        const enrollment = await Enrollment.find({user: req.user._id}).populate('course');
        if(!enrollment || enrollment.length === 0){
            return res.status(400).message({
                message: "No courses enroll or courses not found",
                success: false
            })
        }
        return res.status(200).json({
            message: "check the courses lists",
            success: true,
            enrollment
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error in getting the course",
            error: error.message
        })
    }
}

module.exports.enrollnmentCount = async (req, res)=>{
    try {
        const userCount = await Enrollment.countDocuments({course: req.params.id});
        if(!userCount){
            return res.status(400).message({
                message: "No courses enroll or courses not found",
                success: false
            })
        }
        return res.status(200).json({
            message: "here is enrollnment count!",
            success: true,
            count: userCount
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error in getting the enrollnment count",
            error: error.message
        })
    }
}

module.exports.delete = async (req, res)=>{
    try {
        const deleteEnroll = await Enrollment.findByIdAndDelete(req.params.id);
        if(!deleteEnroll){
            return res.status(400).json({
                message: "No courses enroll or courses not found",
                success: false
            })
        }
        return res.status(200).json({
            message: "course removed successfully!",
            success: true,
            enrollId: req.params.id
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error in deleting the enrollnment course",
            error: error.message
        })
    }
}