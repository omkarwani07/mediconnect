const express = require('express');
const router = express.Router();
const cloudinary = require('../config/cloudinary');
const upload = require('../middlewares/multer');

router.post('/upload', upload.single('image'), function(req, res){
    cloudinary.uploader.upload(req.file.path, function(err, result){
        if(err){
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Error"
            })
        }

        const imagePath = result.url;
        return res.status(200).json({
            success: true,
            message: "Image Uploaded Successfully!",
            imagePath
        })
    })
});
module.exports = router;