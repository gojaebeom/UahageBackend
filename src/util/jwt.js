"use strict";
const jwt = require("jsonwebtoken");
const log = require("../config/Logger");
const secretKey = process.env.APP_SECRET;

// jwt 토큰 발행
exports.createToken = ( userId ) => {
    // return jwt.sign({ uid: userId }, secretKey, { expiresIn: '30s' });
    // roles : 'SUPER' / 'MANAGER' / 'GENERAL' / 'USER'
    return jwt.sign({ uid: userId }, secretKey, { expiresIn: '1y' }); // not time setting
}

// jwt 토큰 해석
exports.verifyToken = ( token ) => {
    let decoded;
    try {
        // verify를 통해 값 decode!
        decoded = jwt.verify(token, secretKey);
    } catch (err) {
        if (err.message === 'jwt expired') {
            log.info('expired token');
            return "EXPIRED";
        } else if (err.message === 'invalid token') {
            log.info('invalid token');
            return "INVALID";
        } else {
            log.info("invalid token");
            return "INVALID";
        }
    }
    return decoded;
}