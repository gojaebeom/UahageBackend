"use strict";
const service = require("../../service/place/Place.service");

exports.store = async (req, res) => {
    const body = req.body;
    const images =req.files;
    const {success, message, result, error} = await service.infoUpdatePropose( body, images );

    success ? 
    res.status(200).json({ message : message,  data : result }): 
    res.status(500).json({ message : message, error : error }); 
}