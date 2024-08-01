const mongoose = require("mongoose");

const createUser = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    isTutor:{
        type: Boolean,
        required: true,
        default: false
    },
    password:{
        type: String,
        required: true
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
},{
    timestamps: true
});

const User = mongoose.model('User', createUser);
module.exports = User;