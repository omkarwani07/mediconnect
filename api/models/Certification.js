const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    institute: {
        type: String,
        required: true
    },
    issue: {
        type: Number
    }
})

module.exports = mongoose.model("Certification", certificationSchema);