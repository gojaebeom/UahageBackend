const { findImagePath, validateImageById, storeImage, editImage } = require("../app/repository/user/User.repo");
const { awsS3Upload, awsS3Delete, awsS3ArrayUpload } = require("../config/AwsS3");
const log = require("../config/Logger");

exports.s3Middleware = (req, res, next) => {
    log.info("미들웨어 방문")

    awsS3Upload(req, res, async ( error )=> {
        log.info("파일 채크!!");
        log.info( req.file );
        if( error ) {
            // 업로드 문제 발생
            log.info("Upload Error");
            if(req.fileTypeError) return res.status(500).json({ message : "image filetype error" });
            return res.status(500).json({message:"image upload error"});
        } else {
            // 성공
            const userId = req.params.id;
            if ( req.file === undefined ){
                // image 파일을 올리지 않을 경우
                log.info("No File Selected!");
                log.info(req.body.imgInit);
                // 이미지 삭제 요청
                if( req.body.imgInit === "Y" ) {
                    let repoObject = await validateImageById( userId );
                    if(!repoObject.success) return res.status(500).json({ message : "image validate error"});

                    if( repoObject.result ){
                        log.info("이미지 존재");
                        repoObject = await findImagePath( userId );
                        if(!repoObject.success) return res.status(500).json({ message : "image select error"});
                        const key = repoObject.result[0].image_path;
                        awsS3Delete( key );

                        repoObject = await editImage( userId, null);
                        if(!repoObject.success) return res.status(500).json({ message : "image update error"});
                    } else {
                        log.info("이미지 없음");
                    }
                }

            } else {
                // 이미지 파일이 올려진 경우
                log.info("File Selected!");
                const imagePath = req.file.location;

                let repoObject = await validateImageById( userId );
                if(!repoObject.success) return res.status(500).json({ message : "image validate error"});

                if( repoObject.result ){
                    log.info("이미지 존재, 기존 이미지 수정");
                    repoObject = await findImagePath( userId );
                    if(!repoObject.success) return res.status(500).json({ message : "image select error"});
                    const key = repoObject.result[0].image_path;

                    awsS3Delete( key );

                    repoObject = await editImage( userId, imagePath );
                    if(!repoObject.success) return res.status(500).json({ message : "image update error"});
                } else {
                    log.info("이미지 없음, 새로 생성");
                    repoObject = await storeImage( userId, imagePath );
                    if(!repoObject.success) return res.status(500).json({ message : "image store error"});
                }
            }
            next();
        }
    });
}

exports.s3MultiFileMiddleware = (req, res, next) => {
    awsS3ArrayUpload(req, res, async ( error )=> {

        log.info( req.files );
        if( error ) {
            // 업로드 문제 발생
            log.info("Upload Error");
            if(req.fileTypeError) return res.status(500).json({ message : "image filetype error" });
            return res.status(500).json({message:"image upload error"});
        } else {
            // 성공
            next();
        }
    });
}

