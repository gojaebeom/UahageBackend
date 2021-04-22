"use strict"
import { store, destroy } from "./bookmark.repository.js";
 
export async function create( req, res ){
    const { user_id ,place_id} = req.body
    console.log( user_id +","+place_id);
    const { success , message, data, error } = await store( user_id ,place_id );
    success === true ? 
    res.status(200).json({ message: message , data : data}) : 
    res.status(500).json({ message: message , error : error });
}

export async function _delete( req, res ){
    const user_id = req.query.user_id;
    const place_id = req.query.place_id;
    const { success , message, data, error } = await destroy(  user_id ,place_id );
    
    success === true ? 
    res.status(200).json({ message: message , data : data }) : 
    res.status(500).json({ message: message , error : error });
}
 


