"use strict";
const AWS = require("aws-sdk");
const path = require("path");
const multer = require("multer");
const multerS3 = require('multer-s3');
const axios = require("axios");

const s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey : process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.S3_REGION,
});
console.log("Create Aws S3 instance");

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


exports.awsS3Delete = ( fullUrlKey ) => {
    if( fullUrlKey ){
        const step1 = fullUrlKey.split("com")[1];
        const key = step1.split("/")[1];
        console.log( key );
    
        s3.deleteObject({
            Bucket : process.env.S3_BUCKET,
            Key : key
        }, (err, data) => {
            if(err) console.log(`이미지 삭제 에러 : ${ err }`);
            else console.log("이미지 삭제 성공");
        });
    }else {
        console.log("이미지 id는 있지만, null 값으로 존재");
    }
 
}
