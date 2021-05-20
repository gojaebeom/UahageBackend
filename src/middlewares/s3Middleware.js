const { awsS3Upload } = require("../configs/awsS3")

exports.s3 = (req, res, next) => {
    awsS3Upload.single("image");
    next();
}