"use strict";
const service = require("../../service/place/RestaurantReview.service");


//? 리뷰 리스트 보기
exports.findByOptions = async (req, res) => {
    const placeId = req.params.id;
    let type = req.query.type || null;
    const order = req.query.order || "DATE"; // date, top, low

    const { success, message, result, error } = await service.findByOptions( placeId, type, order ); 
    
    success ? 
    res.status(200).json({ message : message, data : result }) : 
    res.status(500).json({ message : message, error : error }); 
}


//? 리뷰 상세보기
exports.findOne = async (req, res) =>{
    const reviewId = req.params.id;
    const { success, message, result, error } = await service.findOne( reviewId );

    success ? 
    res.status(200).json({ message : message, data : result }) : 
    res.status(500).json({ message : message, error : error }); 
}


//? 리뷰 생성
exports.store = async (req, res) => {
    const body = req.body;
    const imgFiles =req.files;
    const { userId } = body;
    const tokenUserId = req.tokenUserId;

    //? 요청자/작성자 동일 판별
    if( Number(tokenUserId) !== Number(userId) ){
        console.log(`tokenUserId: ${userId}\nuserId: ${userId}`);
        return res.status(403).json({
            message: "Not metched User",
            data: false
        });
    }

    const { success, message, result, error } = await service.store( body, imgFiles);

    success ? 
    res.status(200).json({ message : message,  data : result }) : 
    res.status(500).json({ message : message, error : error }); 
}


//? 리뷰 수정하기
exports.update = async (req, res) =>{
    const reviewId = req.params.id;
    const body = req.body;
    const images = req.files;

    const { userId } = body;
    const tokenUserId = req.tokenUserId;

    //? 요청자/작성자 동일 판별
    if( Number(tokenUserId) !== Number(userId) ){
        console.log(`tokenUserId: ${userId}\nuserId: ${userId}`);
        return res.status(403).json({
            message: "Not metched User",
            data: false
        });
    }

    const { success, message, result, error } = await service.update( reviewId, body, images );

    success ? 
    res.status(200).json({ message : message,  data : result }) :
    res.status(500).json({ message : message, error : error }); 
}


//? 리뷰 삭제
exports.delete = async (req, res) => {
    const reviewId = req.params.id;

    let serviceObj = await service.findUserIdByReviewId( reviewId );
    const userId = serviceObj.result || 0;

    if( !serviceObj.success ) return res.status(500).json({ message: serviceObj.message, error: serviceObj.error });

    const tokenUserId = req.tokenUserId;

    //? 요청자/작성자 동일 판별
    if( Number(tokenUserId) !== Number(serviceObj.result) ){
        console.log(`tokenUserId: ${userId}\nuserId: ${userId}`);
        return res.status(403).json({
            message: "Not metched User",
            data: false
        });
    }

    
    let { success, message, result, error } = await service.delete( reviewId );

    success ? 
    res.status(200).json({ message: message, data: result }) : 
    res.status(500).json({ message: message, error: error }); 
}


