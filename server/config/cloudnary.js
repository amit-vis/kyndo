const cloudanary = require("cloudinary").v2
const {CloudinaryStorage} = require("multer-storage-cloudinary");
const multer = require("multer");

cloudanary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET, 
})

const storage = new CloudinaryStorage({
    cloudinary: cloudanary,
    params:{
        folder:'learningMaterials',
        allowed_formats: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx', 'mp4', 'avi'],
    },
})

const upload = multer({storage: storage});

module.exports = {
    cloudanary,
    upload
}