const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { publishToQueue } = require("../config/rabbitMq");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
require('dotenv').config();


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
        let user = await User.findOne({ email: email });
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
            console.log(user.password)
            return res.status(401).json({
                message: "Email or password is incorrect!",
                success: false
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            console.log(user.password)
            return res.status(401).json({
                message: "Email or password is incorrect!",
                success: false
            });
        }

        const token = jwt.sign(user.toJSON(), process.env.SECRET_KEY, { expiresIn: "1h" });
        return res.status(200).json({
            message: "Here is the token",
            token,
            userData: user
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
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                message: "Authorization header is missing",
                success: false
            });
        }

        const token = authHeader.split(" ")[1]; // Extract the token after 'Bearer'
        if (!token) {
            return res.status(401).json({
                message: "Token is missing in the Authorization header",
                success: false
            });
        }

        await publishToQueue("invalidatedTokens", token); // Invalidate the token
        return res.status(200).json({
            message: "Logged out successfully"
        });
    } catch (error) {
        return res.status(500).json({ message: "Error logging out", error });
    }
};

module.exports.forgotPassword = async (req, res) => {
    try {
        const { email, isTutor } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required."
            });
        }

        const user = await User.findOne({ email, isTutor });
        if (!user) {
            return res.status(404).json({
                message: "User with this email does not exist."
            });
        }

        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // mailer

        const mailOptions = {
            to: user.email,
            from: process.env.EMAIL_USER,
            subject: 'Password Reset',
            text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n` +
                  `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
                  `http://localhost:3000/reset/${token}\n\n` +
                  `If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };

        transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
                console.error('Error sending email: ', err);
                return res.status(500).json({
                    message: "Error sending the email."
                });
            } else {
                return res.status(200).json({
                    message: 'Recovery email sent.'
                });
            }
        });
    } catch (error) {
        console.error('Server Error: ', error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

module.exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password, cpassword } = req.body;

        if (!password || !cpassword) {
            return res.status(400).json({ message: "All fields are required." });
        }

        if (password !== cpassword) {
            return res.status(400).json({ message: "Passwords do not match!" });
        }

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: "Password reset token is invalid or has expired." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = password;
        console.log(user.password)
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ message: "Password has been successfully reset." });
    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};