
/**
 * PROFILE IMAGE STORING STARTS
 */

const s3 = new aws.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    // bucket: "uahage",
});

exports.post = ( req, res ) => {
    // let id = req.params.id;
    profileImgUpload(req, res, (error) => {
        if (error) {
            console.log("errors", error);
            res.json({ error: error });
        } else {
            // If File not found
            if (req.file === undefined) {
                console.log("Error: No File Selected!");
                res.json("Error: No File Selected");
            } else {
                // If Success
                const imageName = req.file.key;
                const imageLocation = req.file.location;
                // Save the file name into database into profile model
                res.status(200).json({
                    image: imageName,
                    location: imageLocation,
                });
            }
        }
    });
}

exports._delete = ( req, res ) => {
    const  fileName  = req.body.fileName;
    console.log("delete request");
    console.log(fileName);
    let data = fileName.split('/');
    let file = data[data.length - 1].replace("%40", "@"); //"1611718253052akobidov777%40gmail.comkakao.jpg"; //
    console.log(file);

    s3.deleteObject({
            Bucket: process.env.bucket,
            Key: file,
        },
        function (err, data) {
            if (err) {
                console.log(err);
                res.sendStatus(404);
            } else {
                console.log("success");
                res.sendStatus(200);
            }
        }
    );
}

/**
 * Check File Type
 * @param file
 * @param cb
 * @return {*}
 */
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    // const mimetype = filetypes.test(file.mimetype);
    if (extname) {
        return cb(null, true);
    } else {
        cb("Error: Images Only!");
    }
}

/**
 * Single Upload
 */
const profileImgUpload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.BUCKET,
        acl: process.env.ACL,
        key: function (req, file, cb) {
            cb(
                null,
                // path.basename(file.originalname, path.extname(file.originalname)) +
                //   "-" +
                Date.now() + req.params.id + path.extname(file.originalname)
            );
        },
    }),
    limits: { fileSize: 3145728 }, // In bytes: 2000000 bytes = 2 MB
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
}).single("profileImage");