"use strict";
const log = require("../../../config/Logger");
const repository = require("../../repository/place/Place.repo");

exports.infoUpdatePropose = async ( body , images) => {

    if(!images.length){
        log.info("이미지 없음, 리뷰만 저장");
        return await  repository.infoUpdatePropose( body, images );
    } else {
        log.info("이미지 있음, 리뷰, 이미지 저장");
        return await  repository.infoUpdateProposeWithImages( body, images );
    }
}
