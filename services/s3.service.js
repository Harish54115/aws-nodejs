const s3 = require("../config/s3");

const {
    PutObjectCommand,
    ListObjectsV2Command,
    DeleteObjectCommand
} = require("@aws-sdk/client-s3");

const { v4: uuid } = require("uuid");

const uploadImage = async (file) => {

    const key = `images/${uuid()}-${file.originalname}`;

    const command = new PutObjectCommand({

        Bucket: process.env.AWS_BUCKET_NAME,

        Key: key,

        Body: file.buffer,

        ContentType: file.mimetype

    });

    await s3.send(command);

    return {
        key,
        url: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
    };

};

const listImages = async () => {

    const command = new ListObjectsV2Command({

        Bucket: process.env.AWS_BUCKET_NAME

    });

    const data = await s3.send(command);

    return data.Contents;

};

const deleteImage = async (key) => {

    const command = new DeleteObjectCommand({

        Bucket: process.env.AWS_BUCKET_NAME,

        Key: key

    });

    await s3.send(command);

};

module.exports = {
    uploadImage,
    listImages,
    deleteImage
};