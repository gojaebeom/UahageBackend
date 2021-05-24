"use strict";
const repository = require("./placeRepository");

// 장소 리스트 보기
exports.findByOptions = async (req, res) => {
    const {pageNumber, lat, lon} = req.query;
    const { success, result, error } = await repository.findByOptions(pageNumber, lat, lon);
    success ? 
    res.status(200).json({ message : "status ok",  data : result }) : 
    res.status(500).json({ message : "server error", error : error }); 
}

// 장소 상세보기
exports.show = async (req, res) => {
    const placeId = req.params.id;
    const { success, result, error } = await repository.show( placeId );
    success ? 
    res.status(200).json({ message : "status ok",  data : result }) : 
    res.status(500).json({ message : "server error", error : error }); 
}