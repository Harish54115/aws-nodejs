const s3Service = require("../services/s3.service");

const upload = async (req, res) => {

    try {

        const result = await s3Service.uploadImage(req.file);

        res.status(201).json({
            success: true,
            data: result
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

const getImages = async (req, res) => {

    try {

        const images = await s3Service.listImages();

        res.json(images);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

const removeImage = async (req, res) => {

    try {

        await s3Service.deleteImage(req.params.key);

        res.json({
            success: true,
            message: "Deleted Successfully"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

module.exports = {
    upload,
    getImages,
    removeImage
};