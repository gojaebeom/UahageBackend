"use strict";

const { verifyToken } = require("../utils/jwt");

// API 자원 호출 시 기본적으로 사용되는 미들웨어
// 유효한 토큰인지만 확인
exports.defaultAuthMiddlware = (req, res, next) => {
    console.log( "미들웨어" );
    const token = req.headers['authorization'];

    const result = verifyToken( token );
    console.log( result );
    // if( result === "INVALID" ){
    //     return res.status(403).json({
    //         message :"invalid token",
    //         data : false
    //     });
    // }else if( result === "EXPIRED"){
    //     return res.status(403).json({
    //         message :"expired token",
    //         data : false
    //     });
    // }
    next();
}