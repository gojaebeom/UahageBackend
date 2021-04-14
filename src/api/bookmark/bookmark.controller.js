"use strict"

const {   store, destroy, findOne } = require("./bookmark.repository");
 
exports.create = async ( req, res ) => {
    const body = req.body;
    console.log(body);
    const { success , message, data, error } = await store( body );
    success === true ? 
    res.status(200).json({ message: message , data : data}) : 
    res.status(500).json({ message: message , error : error });
}

exports._delete = async ( req, res ) => {
    const id = req.query.user_id;
    const space_id= req.query.space_id;

    const { success , message, data, error } = await destroy( id ,space_id );
    
    success === true ? 
    res.status(200).json({ message: message , data : data }) : 
    res.status(500).json({ message: message , error : error });
}
 

exports.show = async ( req, res ) => {
    const id = req.params.id;
    const { success , message, data, error } = await findOne( id );
    success === true ? 
    res.status(200).json({ message: message , data : data}) : 
    res.status(500).json({ message: message , error : error });
}
