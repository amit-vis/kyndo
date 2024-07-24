const mongoose = require("mongoose");

const syllabusItemSchem = new mongoose.Schema({
    week:{
        type: Number,
        required: true
    },
    topics:[{
        type: String,
        required: true
    }],
    readings:[{
        type: String
    }],
    assignments:[{
        type: String
    }]
},{
    timestamps: true
})

const Syllabus = mongoose.model('Syllabus', syllabusItemSchem);
module.exports = Syllabus;