const { awsS3Upload } = require("../configs/awsS3")

exports.s3 = (req, res, next) => {
    awsS3Upload(req, res, ( error )=> {
        if( error ) {
            // 업로드 문제 발생
            console.log("에러!!");
            next();
        } else {
            // 성공
            if ( req.file === undefined ) {
                // image 파일을 올리지 않을 경우
                console.log("No File Selected!");

                if( req.body.imageState === "1" ) {
                    console.log("기본 이미지로 변경");
                    req.imagePath = "https://uahage.s3.ap-northeast-2.amazonaws.com/users/DefaultProfile.png";
                } else if( req.body.imageState === "2" ){
                    // 미구현
                    console.log("이미지 삭제 및 기본이미지로 변경");
                    req.imagePath = "https://uahage.s3.ap-northeast-2.amazonaws.com/users/DefaultProfile.png";
                }
                
                next();
            } else {
                // 이미지 파일이 올려진 경우
                console.log("File Selected!");
                req.imagePath = req.file.location;
                next();
            }
        }
    });
}