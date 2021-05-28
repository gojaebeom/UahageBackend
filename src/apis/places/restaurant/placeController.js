"use strict";
const repository = require("./placeRepository");

// 북마크 관계 생성, 또는 제거
exports.bookmarkToogle = async (req, res) => {
    const { userId, placeId } = req.body;

    console.log(userId, placeId);

    let repoObject = await repository.validateBookmark( userId, placeId );

    const bookmarkId = repoObject.result.id;
    let isBookmarked = false;
    if( bookmarkId ){
        // 북마크 존재 -> 북마크 관계 제거
        repoObject = await repository.deleteBookmark( bookmarkId );
    }else {
        // 북마크 없음 -> 북마크 관계 생성
        repoObject = await repository.storeBookmark( userId, placeId );
        isBookmarked = true;
    }

    repoObject.success ? 
    res.status(200).json({ message : "status ok",  data : { isBookmarked : isBookmarked } }) : 
    res.status(500).json({ message : "server error", error : repoObject.error }); 
}

// 쿼리스트링 옵션에 따라 모두보기, 북마크된 게시물만 보기, 시설정보 필터에 따라 보기 
exports.findByOptions = async (req, res) => {
    console.log( req.query );
    const options = req.query;
    console.log(options);
    const { success, result, error } = await repository.findByOptions( options );
    success ? 
    res.status(200).json({ message : "status ok",  data : result }) : 
    res.status(500).json({ message : "server error", error : error }); 
}

// 장소 상세보기
exports.show = async (req, res) => {
    const placeId = req.params.id;
    const { success, result, error } = await repository.show( placeId );
    success ? 
    res.status(200).json({ message : "Get place detail success",  data : result }) : 
    res.status(500).json({ message : "Get place detail false", error : error }); 
}

// 장소 리뷰 달기
exports.storeReview = async (req, res) => {
    const body = req.body;

    const images = req.files; // images[n].location -> imagePath
    const tasteRating = Number(body.tasteRating);
    const costRating = Number(body.costRating);
    const serviceRating = Number(body.serviceRating);
    const totalRating = Math.floor(( tasteRating + costRating + serviceRating ) / 3);

    const repoObj = await repository.storeReview({
        images : images,
        userId : body.userId,
        placeId : body.placeId,
        desc : body.desc,
        totalRating : totalRating,
        tasteRating : tasteRating,
        costRating : costRating,
        serviceRating :serviceRating
    });

    repoObj.success ? 
    res.status(200).json({ message : "review store success",  data : repoObj.result }) : 
    res.status(500).json({ message : "review store false", error : repoObj.error }); 
}

// 장소 리뷰 삭제
exports.deleteReview = async (req, res) => {
    const reviewId = req.params;
    const repoObj = await repository.deleteReviewStepOne( reviewId );
    
    repoObj.success ? 
    res.status(200).json({ message : "review delete success",  data : repoObj.result }) : 
    res.status(500).json({ message : "review delete false", error : repoObj.error }); 
}