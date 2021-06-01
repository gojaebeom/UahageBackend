"use strict";
const { infoLog, warningLog } = require("../../../utils/log");
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
        // 북마크 없음 -> 북마크 관계 생성`
        repoObject = await repository.storeBookmark( userId, placeId );
        isBookmarked = true;
    }

    repoObject.success ? 
    res.status(200).json({ message : "status ok",  data : { isBookmarked : isBookmarked } }) : 
    res.status(500).json({ message : "server error", error : repoObject.error }); 
}

// 쿼리스트링 옵션에 따라 모두보기, 북마크된 게시물만 보기, 시설정보 필터에 따라 보기 
exports.findByOptions = async (req, res) => {
    const options = req.query;
    const {pageNumber} = options;
    let success , result , error;
    if(!pageNumber){
        console.log("전체보기");
        for(let option in options) {
            if(options[option] === "0"){
                options[option] = false;
            }
        }

        const body = await repository.findAll(options);
        success = body.success;
        result = body.result;
        error = body.error;}
    else{
        console.log("10개씩 끊어서 보기");
        const body = await repository.findByOptions(options);
        success = body.success;
        result = body.result;
        error = body.error;
    }
    success ? 
    res.status(200).json({ message : "status ok",  data : result }) : 
    res.status(500).json({ message : "server error", error : error }); 
}

// 장소 상세보기
exports.findOne = async (req, res) => {
    const placeId = req.params.id;
    const { success, result, error } = await repository.findOne( placeId );
    success ? 
    res.status(200).json({ message : "Get place detail success",  data : result }) : 
    res.status(500).json({ message : "Get place detail false", error : error }); 
}

// 리뷰 리스트 보기
exports.findReviews = async (req, res) => {
    const placeId = req.params.id;

    let type = req.query.type || null; // 없거나, img 
    type = type !== null && type.toUpperCase();
    let repoObj;
    if( type === "IMG"){
        console.log("이미지 확인");
        repoObj = await repository.findReviewImages( placeId );
    }else {
        const order = req.query.order || "DATE"; // desc, top, low
        const option = order.toUpperCase();
        repoObj = await repository.findReviewsByOption( placeId, option );
    }

    repoObj.success ? 
    res.status(200).json({ message : "get reviews success",  data : repoObj.result }) : 
    res.status(500).json({ message : "get reviews false", error : repoObj.error }); 
}

// 리뷰 상세보기
exports.findOneReview = async (req, res) =>{
    const reviewId = req.params.id;
    const repoObj = await repository.findOneReview( reviewId );

    repoObj.success ? 
    res.status(200).json({ message : "get review detail success",  data : repoObj.result }) : 
    res.status(500).json({ message : "get review detail false", error : repoObj.error }); 
}

// 장소 리뷰 달기
exports.storeReview = async (req, res) => {
    const body = req.body;

    let images = req.files; // images[n].location -> imagePath
    const tasteRating = Number(body.tasteRating);
    const costRating = Number(body.costRating);
    const serviceRating = Number(body.serviceRating);
    const totalRating = Math.floor(( tasteRating + costRating + serviceRating ) / 3);

    let repoObj;
    if(!images.length){
        infoLog("이미지 없음, 리뷰만 저장");
        repoObj = await repository.storeReview({
            userId : body.userId,
            placeId : body.placeId,
            desc : body.desc,
            totalRating : totalRating,
            tasteRating : tasteRating,
            costRating : costRating,
            serviceRating :serviceRating
        });
    } else {
        infoLog("이미지 있음, 리뷰, 이미지 저장");
        repoObj = await repository.storeReviewWithImages({
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

    repoObj.success ? 
    res.status(200).json({ message : "review store success",  data : repoObj.result }) : 
    res.status(500).json({ message : "review store false", error : repoObj.error }); 
}

// 리뷰 수정하기
exports.updateReview = async (req, res) =>{
    const reviewId = req.params.id;
    const body = req.body;
    const tasteRating = Number(body.tasteRating);
    const costRating = Number(body.costRating);
    const serviceRating = Number(body.serviceRating);
    const totalRating = Math.floor(( tasteRating + costRating + serviceRating ) / 3);

    const repoObj = await repository.updateReview( reviewId , {
        desc : body.desc,
        totalRating : totalRating,
        tasteRating : tasteRating,
        costRating : costRating,
        serviceRating :serviceRating
    });

    repoObj.success ? 
    res.status(200).json({ message : "update review success",  data : repoObj.result }) : 
    res.status(500).json({ message : "update review false", error : repoObj.error }); 
}

// 장소 리뷰 삭제
exports.deleteReview = async (req, res) => {
    const reviewId = req.params;
    const repoObj = await repository.deleteReviewStepOne( reviewId );
    
    repoObj.success ? 
    res.status(200).json({ message : "review delete success",  data : repoObj.result }) : 
    res.status(500).json({ message : "review delete false", error : repoObj.error }); 
}

// 리뷰 신고
exports.storeReviewDeclarations = async (req, res) =>{
    const body = req.body;
    const repoObj = await repository.storeReviewDeclarations( body );
    
    repoObj.success ? 
    res.status(200).json({ message : "review delete success",  data : repoObj.result }) : 
    res.status(500).json({ message : "review delete false", error : repoObj.error }); 
}