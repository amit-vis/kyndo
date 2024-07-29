const mongoose = require("mongoose");

const learningMaterialSchema = new mongoose.Schema({
    topic:{
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true
    }
},{
    timestamps: true
})

const LearningMaterial = mongoose.model("LearningMaterial", learningMaterialSchema);
module.exports = LearningMaterial;