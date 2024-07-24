const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    syllabus:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Syllabus"
    }],
    learningMaterials:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "LearningMaterial",
    }],
    tutor:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    }
},{
    timestamps: true
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;