const LearningMaterial = require("../model/course/learningMaterial");
const Course = require("../model/course/course");
const cloudinary = require("../config/cloudnary")

module.exports.create = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if(!course){
            return res.status(400).json({
                message: "Course not available or not exist!!",
                success: false
            })
        }
        const {topic, type} = req.body;
        const file = req.files ? req.files.file : null;
        const result = await cloudinary.uploader.upload(file.tempFilePath,{
            folder: "Amit"
        })
        const newData = await LearningMaterial.create({
            topic: topic,
            type: type,
            url: result.secure_url
        })

        course.learningMaterials.push(newData._id);
        await course.save();
        return res.status(200).json({
            message:"Course created successfully!!",
            success: true,
            learningdata: newData
        })
    } catch (error) {
        console.log("Error during file upload:", error);
        return res.status(500).json({
            message: "Internal server error in creating the learning material!",
            error: error.message
        });
    }
};