const LearningMaterial = require("../model/course/learningMaterial");
const Course = require("../model/course/course");

module.exports.create = async (req, res)=>{
    try {
        const findCourse = await Course.findById(req.params.id);
        if(!findCourse){
            return res.status(400).json({
                message: "Course not available or not found!",
                success: false,
            })
        }
        const learningMaterial = await LearningMaterial.create({
            url: req.file.path,
            type: req.file.mimetype,
            course: findCourse._id 
        });

        findCourse.learningMaterials.push(learningMaterial._id);
        await findCourse.save();
        return res.status(200).json({
            message: "Your learning material created!",
            success: true,
            learningMaterial
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in creating the learning material!",
            error: error.message
        })
    }
}