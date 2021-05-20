const { awsS3Upload } = require("../configs/awsS3")

exports.s3 = ( ) => {
    awsS3Upload.single("image");
}