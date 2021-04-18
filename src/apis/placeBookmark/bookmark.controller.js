"use strict"
import { store, destroy, findOne } from "./bookmark.repository.js";
//const {   store, destroy, findOne } = require("./bookmark.repository");
 
export async function create( req, res ){
    const body = req.body;
    console.log(body);
    const { success , message, data, error } = await store( body );
    success === true ? 
    res.status(200).json({ message: message , data : data}) : 
    res.status(500).json({ message: message , error : error });
}

export async function _delete( req, res ){
    const id = req.query.user_id;
    const space_id= req.query.space_id;

    const { success , message, data, error } = await destroy( id ,space_id );
    
    success === true ? 
    res.status(200).json({ message: message , data : data }) : 
    res.status(500).json({ message: message , error : error });
}
 

export async function show( req, res ){
    const id = req.params.id;
    const { success , message, data, error } = await findOne( id );
    success === true ? 
    res.status(200).json({ message: message , data : data}) : 
    res.status(500).json({ message: message , error : error });
}
