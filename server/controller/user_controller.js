const User = require("../model/resgister");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { publishToQueue } = require("../config/rabbitMq");

module.exports.create = async (req, res) => {
    try {
        const { name, email, password, cpassword, isTutor } = req.body;
        if (!name || !email || !password || !cpassword) {
            return res.status(403).json({
                message: "Input section should not be empty!",
                success: false
            });
        }
        if (password !== cpassword) {
            return res.status(400).json({
                message: "Password does not match with confirm password!",
                success: false
            });
        }
        const passwordRegx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%!^&*+=]).{6,}$/;
        if (!passwordRegx.test(password)) {
            return res.status(401).json({
                message: "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 6 characters long.",
                success: false
            });
        }
        let user = await User.findOne({ email: email, isTutor: isTutor });
        if (user) {
            return res.status(402).json({
                message: "User already exists!",
                success: false
            });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        user = await User.create({
            name: name,
            email: email,
            isTutor: isTutor,
            password: hashPassword
        });
        return res.status(200).json({
            message: "User Registered successfully!",
            success: true,
            user
        });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            message: "Internal server error in registering the user",
            error: error.message
        });
    }
};

module.exports.signin = async (req, res) => {
    try {
        const { email, password,isTutor } = req.body;

        if (email === "" || password === "" || isTutor==="") {
            return res.status(400).json({
                message: "Input section should not be empty",
                success: false
            });
        }

        const user = await User.findOne({ email: email, isTutor: isTutor });
        if (!user) {
            return res.status(401).json({
                message: "Email or password is incorrect!",
                success: false
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Email or password is incorrect!",
                success: false
            });
        }

        const token = jwt.sign(user.toJSON(), process.env.SECRET_KEY, { expiresIn: "1h" });
        return res.status(200).json({
            message: "Here is the token",
            token
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in signing the user",
            error: error.message
        });
    }
};

module.exports.getDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(400).json({
                message: "User does not exist or not found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Here is the user data",
            success: true,
            user
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in getting the user",
            error: error.message
        });
    }
};


module.exports.logout = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        await publishToQueue("invalidatedTokens", token);
        return res.status(200).json({
            message: "Logged out successfully"
        });
    } catch (error) {
        return res.status(500).json({ message: "Error logging out", error });
    }
};
