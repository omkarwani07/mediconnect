const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    desc: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    likes: {
        type: Number,
    },
    comments: [
        {
            type: String,
        }
    ]
})

module.exports = mongoose.model("Post", postSchema);