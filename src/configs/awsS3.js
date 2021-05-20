"use strict";
const AWS = require("aws-sdk");
const path = require("path");
const multer = require("multer");
const multerS3 = require('multer-s3');

const s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey : process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.S3_REGION,
});
console.log("Create Aws S3 instance")


exports.awsS3Upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET,
        key: function (req, file, cb) {
            const extension = path.extname(file.originalname);
            cb(null, Date.now().toString() + extension);
        },
        acl: process.env.S3_ACL,
    })
}).single("image");