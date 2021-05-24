"use strict";

const { verifyToken } = require("../utils/jwt");

// API 자원 호출 시 기본적으로 사용되는 미들웨어
// 유효한 토큰인지만 확인
exports.defaultAuthMiddlware = (req, res, next) => {
    const token = req.headers['authorization'];

    const result = verifyToken( token );
    console.log( result );
    next();
}

// API 자원 호출 시 UPDATE , DELETE , POST 요청에 대한 인증 처리
exports.AuthMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    const result = verifyToken( token );

    if( result === "VERIFY" ){
        console.log( result );
        next();
    }else {
        res.json({"message":false});
    }
}