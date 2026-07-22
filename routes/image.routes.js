const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const controller = require("../controllers/image.controller");

router.post(
    "/upload",
    upload.single("image"),
    controller.upload
);

router.get(
    "/",
    controller.getImages
);

router.delete(
    "/:key",
    controller.removeImage
);

module.exports = router;