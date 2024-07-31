const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    institute: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    startYear: {
        type: Number
    },
    endYear: {
        type: Number
    }
})

module.exports = mongoose.model("Experience", experienceSchema);