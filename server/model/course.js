const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    videoUrl:{
        type: String
    },
    prerequisites:{
        type: String
    },

    syllabus:[{
        chapters:[String]
    }],
    courseNotes:{
        type: String
    },
    courseAssignments:{
        type: String
    },
    courseThumbnail:{
        type: String
    },
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