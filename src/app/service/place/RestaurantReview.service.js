"use strict";

const { awsS3Delete } = require("../../../config/AwsS3");
const repository = require("../../repository/place/Restaurant.repo");

exports.findByOptions = async ( placeId, type, order ) => {
    type = type !== null && type.toUpperCase();
    if( type === "IMG" ){
        return await repository.findReviewImages( placeId );
    }else {
        const option = order.toUpperCase();
        return await repository.findReviewsByOption( placeId, option );
    }
}

exports.findOne = async ( reviewId ) => await repository.findOneReview( reviewId );

exports.store = async ( body, images ) => {

    const tasteRating = Number(body.tasteRating);
    const costRating = Number(body.costRating);
    const serviceRating = Number(body.serviceRating);
    let totalRating = ( tasteRating + costRating + serviceRating ) / 3;
    totalRating = totalRating.toFixed(1);
    console.log(`맛:${ tasteRating}\n가격:${costRating}\n서비스레이팅:${serviceRating}\n토탈레이팅:${totalRating}`);

    if(!images.length){
        console.log("이미지 없음, 리뷰만 저장");
        return await repository.storeReview({
            userId : body.userId,
            placeId : body.placeId,
            desc : body.desc,
            totalRating : totalRating,
            tasteRating : tasteRating,
            costRating : costRating,
            serviceRating :serviceRating
        });
    } else {
        console.log("이미지 있음, 리뷰, 이미지 저장");
        return await repository.storeReviewWithImages({
            images : images,
            userId : body.userId,
            placeId : body.placeId,
            desc : body.desc,
            totalRating : totalRating,
            tasteRating : tasteRating,
            costRating : costRating,
            serviceRating :serviceRating
        });
    }
}

exports.update = async ( reviewId, body, images ) => {

    const desc = body.desc;
    const tasteRating = Number(body.tasteRating);
    const costRating = Number(body.costRating);
    const serviceRating = Number(body.serviceRating);
    let totalRating = ( tasteRating + costRating + serviceRating ) / 3;
    totalRating = totalRating.toFixed(1);
    console.log(reviewId);
    console.log(`맛:${ tasteRating}\n가격:${costRating}\n서비스레이팅:${serviceRating}\n토탈레이팅:${totalRating}`);
    const deleteImgConcatText = body.deleteImgConcatText;

    let repoObj;
    if( deleteImgConcatText ) {
        console.log(deleteImgConcatText);
        const delImgList = deleteImgConcatText.split(",");

        delImgList.map( async (item) => {
            repoObj = await repository.deleteReviewImage( item );
            console.log(`${ item } 이미지 삭제 완료`);

            awsS3Delete( item );
        });
    }

    if(!images.length){

        console.log("이미지 없음, 리뷰만 수정");
        return await repository.updateReview( reviewId , {
            desc : desc,
            totalRating : totalRating,
            tasteRating : tasteRating,
            costRating : costRating,
            serviceRating :serviceRating
        });  

    } else {
        console.log("이미지 있음, 리뷰수정 및 이미지 생성");
        repoObj = await repository.updateReview( reviewId , {
            desc : desc,
            totalRating : totalRating,
            tasteRating : tasteRating,
            costRating : costRating,
            serviceRating :serviceRating
        }); 
        if( !repoObj.success ) return repoObj;

        repoObj = await repository.storeReviewImages( reviewId, images);
    }

    return repoObj;
}

exports.delete = async ( reviewId ) => {
    return await repository.delete( reviewId );
}

exports.findUserIdByReviewId = async ( reviewId )  => await repository.findUserIdByReviewId( reviewId );