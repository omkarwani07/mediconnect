const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true
    },
    fname: {
        type: String,
        trim: true,
        required: true
    },
    lname: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    bio: {
        type: String,
    },
    status: {
        type: String,
        enum: ["Active", "Working"]
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    education: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Education"
        }
    ],
    experience: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Experience"
        }
    ],
    certification: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Certification"
        }
    ]
    
})

module.exports = mongoose.model("User", userSchema);