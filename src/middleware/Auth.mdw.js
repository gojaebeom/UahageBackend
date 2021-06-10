"use strict";

const { verifyToken } = require("../util/jwt");

//? 유효한 [Access Token 을 가지고 있는지 확인]
exports.authMiddleware = (req, res, next) => {
    const token = req.headers["authorization"];

    const result = verifyToken( token );

    console.log( result );

    if( result === "INVALID" ){
        return res.status(403).json({
            message :"Invalid token",
            data : "INVALID",
        });
    }else if( result === "EXPIRED"){
        return res.status(403).json({
            message :"Expired token",
            data : "EXPIRED",
        });
    }

    req.tokenUserId = result.uid;

    next();
}