const Education = require('../models/Education');
const Certification = require('../models/Certification');
const Experience = require('../models/Experience');
const Post = require('../models/Post');
const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    try{
        const {username, fname, lname, email, password, confirmPassword} = req.body;

        if(!fname || !lname || !username || !email || !password || !confirmPassword){
            return res.status(401).json({
                success: false,
                message: "Fill All the Details"
            })
        }

        if(password!==confirmPassword){
            return res.status(401).json({
                success: false,
                message: "Password must be Same"
            })
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(401).json({
                success: false,
                message: "User Already Exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const response = await User.create({username, fname, lname, email, password: hashedPassword});
        return res.status(200).json({
            success: true,
            message: "User Registered Successfully",
        })

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(401).json({
                success: false,
                message: "Please Fill All the Details"
            })
        }

        const existingUser = await User.findOne({email});
        
        if(!existingUser){
            return res.status(401).json({
                success: false,
                message: "User Doesn't Exist, Please Register"
            })
        }

        const hashedPassword = await bcrypt.compare(password, existingUser.password);
        if(!hashedPassword){
            return res.status(401).json({
                success: false,
                message: "Invalid Email Id or Password"
            })
        }
        else{
            const user = await User.findOne({email}, {password: false, _id: false}).populate("education").populate("followers").populate("following").populate("experience").populate("certification").populate("posts").exec();
            // const user = await User.findOne({email}, {password: false, _id: false}).populate("education").populate("followers").populate("following").populate("certification").populate("experience").exec();

            return res.status(200).json({
                success: true,
                message: "Login Successful",
                username: existingUser.username,
                user: user
            })
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

exports.editProfile = async (req, res) => {
    try{
        const {fname, lname, bio, username} = req.body;
        
        if(!fname || !lname || !bio, !username){
            return res.status(401).json({
                success: false,
                message: "Fill All the Details"
            })
        }

        const response = await User.findOneAndUpdate({username}, {
            fname, lname, bio
        })

        const existingUser = await User.findOne({username});

        const user = await User.findOne({email}, {password: false, _id: false}).populate("education").populate("followers").populate("following").populate("posts").populate("experience").populate("certification").exec();
        // const user = await User.findOne({username}, {password: false, _id: false}).populate("education").populate("followers").populate("following").populate("certification").populate("experience").exec();

        return res.status(200).json({
            success: true,
            message: "Profile Editted Successfully",
            username: existingUser.username,
            user: user
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

exports.addEducation = async (req, res) => {
    try{
        const {institute, degree, startYear, endYear, specialization, username} = req.body;
        
        if(!institute || !degree || !startYear || !endYear || !specialization){
            return res.status(401).json({
                success: false,
                message: "Fill All the Details"
            })
        }

        const education = await Education.create({institute, degree, startYear, endYear, specialization});

        await User.findOneAndUpdate({username}, {
                $push: {
                    education: education._id
                }
            },{new: true}
        )

        const existingUser = await User.findOne({username}, {password: false, _id: false}).populate("education").populate("followers").populate("following").populate("posts").populate("experience").populate("certification").exec();
        // const existingUser = await User.findOne({username}, {password: false, _id: false}).populate("education").populate("followers").populate("following").populate("certification").populate("experience").exec();

        return res.status(200).json({
            success: true,
            message: "Education Added Successfully",
            username: existingUser.username,
            user: existingUser
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

exports.addCertificate = async (req, res) => {
    try{
        const {institute, title, issue, username} = req.body;
        
        if(!institute || !title || !issue){
            return res.status(401).json({
                success: false,
                message: "Fill All the Details"
            })
        }

        const certification = await Certification.create({institute, title, issue});

        await User.findOneAndUpdate({username}, {
                $push: {
                    certification: certification._id
                }
            },{new: true}
        )

        const existingUser = await User.findOne({username}, {password: false, _id: false}).populate("education").populate("followers").populate("following").populate("posts").populate("experience").populate("certification").exec();
        // const existingUser = await User.findOne({username}, {password: false, _id: false}).populate("education").populate("followers").populate("following").populate("certification").populate("experience").exec();

        return res.status(200).json({
            success: true,
            message: "Certification Added Successfully",
            username: existingUser.username,
            user: existingUser
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

exports.addExperience = async (req, res) => {
    try{
        const {institute, role, startYear, endYear, username} = req.body;
        
        if(!institute || !role || !startYear || !endYear){
            return res.status(401).json({
                success: false,
                message: "Fill All the Details"
            })
        }

        const experience = await Experience.create({institute, role, startYear, endYear});

        await User.findOneAndUpdate({username}, {
                $push: {
                    experience: experience._id
                }
            },{new: true}
        )

        const existingUser = await User.findOne({username}, {password: false, _id: false}).populate("education").populate("followers").populate("following").populate("posts").populate("experience").populate("certification").exec();
        // const existingUser = await User.findOne({username}, {password: false, _id: false}).populate("education").populate("followers").populate("following").populate("certification").populate("experience").exec();

        return res.status(200).json({
            success: true,
            message: "Experience Added Successfully",
            username: existingUser.username,
            user: existingUser
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

exports.createPost = async (req, res) => {
    try{
        const {desc, image, username} = req.body;
        
        if(!desc || !image){
            return res.status(401).json({
                success: false,
                message: "Fill All the Details"
            })
        }

        const post = await Post.create({desc, image});

        await User.findOneAndUpdate({username}, {
                $push: {
                    posts: post._id
                }
            },{new: true}
        )

        const existingUser = await User.findOne({username}, {password: false, _id: false}).populate("education").populate("followers").populate("following").populate("posts").populate("experience").populate("certification").exec();
        // const existingUser = await User.findOne({username}, {password: false, _id: false}).populate("education").populate("followers").populate("following").populate("certification").populate("experience").populate("posts").exec();

        return res.status(200).json({
            success: true,
            message: "Experience Added Successfully",
            username: existingUser.username,
            user: existingUser
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}


exports.showConnections = async (req, res) => {
    try{
        const {username} = req.body;

        const user = User.find({username: {$ne: username}});

        console.log(user);

        return res.status(200).json({
            success: true,
            message: "Recommended Connections",
            username: username,
            user: user
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}