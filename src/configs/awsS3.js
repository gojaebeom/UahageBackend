"use strict";
const AWS = require("aws-sdk");
const path = require("path");
AWS.config.loadFromPath(path.resolve(__dirname, "s3.json"));
const multer = require("multer");
const multerS3 = require('multer-s3');
const s3 = new AWS.S3();
console.log("Create Aws S3 instance");

exports.awsS3Upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "uahage",
        key: function (req, file, cb) {
            const extension = path.extname(file.originalname);
            cb(null, Date.now().toString() + extension);
        },
        acl: "public-read-write",
    })
}).single("image");