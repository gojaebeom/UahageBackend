"use strict"
//import { findAll } from "../user/user.repository.js";
import {findOne ,findAll, store, destroy } from "./bookmark.repository.js";
 
export async function show( req, res ){
    const {user_id,place_id} = req.query;
    let success , message, data, error;

    if(place_id!=undefined){
        //BOOKMARK 하나만 가져옴
        let resultOjbect = await findOne( user_id ,place_id );
        success = resultOjbect.success;
        message = resultOjbect.message;
        data = resultOjbect.data;
        error = resultOjbect.error;
    }else{
         //BOOKMARK 모두 가져옴(즐겨찾기 목록)
        let resultOjbect = await findAll( user_id );
        success = resultOjbect.success;
        message = resultOjbect.message;
        data = resultOjbect.data;
        error = resultOjbect.error;
    }
    success === true ? 
    res.status(200).json({ message: message , data : data}) : 
    res.status(500).json({ message: message , error : error });
}
export async function create( req, res ){
    const { user_id ,place_id} = req.body
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
 


