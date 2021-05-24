"use strict";
// 미완성 : 프론트단에서 토큰이 어떻게 넘어오는지 확인 필요

exports.auth = (req, res, next) => {
    console.log(req.headers['']);
    next();
}