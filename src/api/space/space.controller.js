"use strict"
const { findOne } = require("./space.repository");

exports.show = async ( req, res ) => {
    const space_code = req.params.space_code;
    const { success , message, data, error } = await findOne( space_code );
    success === true ? 
    res.status(200).json({ message: message , data : data }) : 
    res.status(500).json({ message: message , error : error });
}