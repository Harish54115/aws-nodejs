const multer = require('multer');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const allowed =[
        "image/jpg",
        "image/jpeg",
        "image/png",
        "image/webp"
    ]

    if (allowed.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only Images allowed"));
    }
};

module.exports = multer({
    storage,
    limits:{ fileSize: 5*1024*1024 },
    fileFilter
});