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
        key: (req, file, cb) => {
            const extension = path.extname(file.originalname);
            extension.split(".")[1];
            console.log("파일 확장자");
            console.log(extension);

            cb(null, Date.now().toString() + extension);
        },
        acl: process.env.S3_ACL,
    }),
    fileFilter : (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        console.log( "파일 검사" );
        const extName = fileTypes.test(path.extname(file.originalname).toLocaleLowerCase());

        if( extName ) {
            console.log( extName );
            return cb(null, true); 
        } else {
            req.fileTypeError = true;
            cb("Error : Images Only!");
        }
    }
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
