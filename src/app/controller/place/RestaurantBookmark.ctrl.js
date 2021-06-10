"use strict";
const service = require("../../service/place/RestaurantBookmark.service");

// 북마크 관계 생성, 또는 제거
exports.bookmarkToogle = async (req, res) => {
    const tokenUserId = req.tokenUserId;
    const { userId, placeId } = req.body;

    //? 요청자/작성자 동일 판별
    if( Number(tokenUserId) !== Number(userId) ){
        console.log(`tokenUserId: ${userId}\nuserId: ${userId}`);
        return res.status(403).json({
            message: "Not metched User",
            data: false
        });
    }

    const { success, message, result, error } = await service.bookmarkToggle( userId, placeId );

    success ? 
    res.status(200).json({ message : message,  data : result }) : 
    res.status(500).json({ message : message, error : error }); 
}