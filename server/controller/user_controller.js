const User = require("../model/resgister");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.create = async (req, res)=>{
    try {
        const {name, email,password, cpassword, isTutor} = req.body;
        if(name === "" || email === "" || password === "" || cpassword === ""){
            return res.status(403).json({
                message: "Input section should not be empty!",
                success: false
            }) 
        }
        if(password !== cpassword){
            return res.status(400).json({
                message: "password  does not match with confirm password!",
                success: false
            })
        }
        const passwordRegx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%!^&*+=]).{6,}$/;
        if(!passwordRegx.test(password)){
            return res.status(401).json({
                message: "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 6 characters long.",
                success: false
            })
        }
        let user = await User.findOne({email: email,isTutor:isTutor});
        if(user){
            return res.status(402).json({
                message:"User already exist!",
                success: false
            })
        }
        const hashPassword = await bcrypt.hash(password, 10);
        user = await User.create({
            name : name,
            email: email,
            isTutor: isTutor,
            password: hashPassword
        })
        return res.status(200).json({
            message: "User Registered successfully!",
            success: true,
            user
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error in registring the user",
            error: error.message
        })
    }
}

// module.exports.signin = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         if (email === "" || password === "") {
//             return res.status(400).json({
//                 message: "Input section should not be empty",
//                 success: false
//             });
//         }
//         const user = await User.findOne({ email: email });
//         if (!user || !(await bcrypt.compare(password, user.password))) {
//             return res.status(401).json({
//                 message: "Email or password is incorrect!",
//                 success: false
//             });
//         }
//         const token = jwt.sign(user.toJSON(), process.env.secretkey, { expiresIn: "1h" });
//         return res.status(200).json({
//             message: "Here is the token",
//             token
//         });
//     } catch (error) {
//         return res.status(500).json({
//             message: "Internal server error in signing the user",
//             error: error.message
//         });
//     }
// }

module.exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Check for empty inputs
        if (email === "" || password === "") {
            return res.status(400).json({
                message: "Input section should not be empty",
                success: false
            });
        }

        // Find the user in the database
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(401).json({
                message: "Email or password is incorrect!",
                success: false
            });
        }

        // Compare the provided password with the stored hash
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Email or password is incorrect!",
                success: false
            });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, process.env.secretkey, { expiresIn: "1h" });
        return res.status(200).json({
            message: "Here is the token",
            token
        });
    } catch (error) {
        console.error("Signin Error:", error);
        return res.status(500).json({
            message: "Internal server error in signing the user",
            error: error.message
        });
    }
};