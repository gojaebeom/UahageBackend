"use strict";
const repository = require("../../repository/place/Place.repo");

exports.infoUpdatePropose = async ( body , images) => {

    if(!images.length){
        console.log("이미지 없음, 리뷰만 저장");
        return await  repository.infoUpdatePropose( body, images );
    } else {
        console.log("이미지 있음, 리뷰, 이미지 저장");
        return await  repository.infoUpdateProposeWithImages( body, images );
    }
}
