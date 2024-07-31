const mongoose = require('mongoose');

const eduSchema = new mongoose.Schema({
    institute: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    startYear: {
        type: Number
    },
    endYear: {
        type: Number
    },
    specialization: {
        type: String
    }
})

module.exports = mongoose.model("Education", eduSchema);