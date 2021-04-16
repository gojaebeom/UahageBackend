"use strict"
import { findAll, findOne } from "./place.repository.js";

export async function index( req, res ){

    const resData = { success:null, message:null, data:null, error:null}
    if(!req.query.lat || !req.query.lon){
        const { success , message, data, error } = await findAll( );
        resData.success = success;
        resData.message = message;
        resData.data = data;
        resData.error = error;
    }
    //const { place_code , lat, lon } = req.query;
    
    success === true ? 
    res.status(200).json({ message: resData.message , data : resData.data}) : 
    res.status(500).json({ message: resData.message , error : resData.error });
} 

export async function show( req, res ){
    const space_code = req.params.place_code;
    const { success , message, data, error } = await findOne( space_code );
    success === true ? 
    res.status(200).json({ message: message , data : data}) : 
    res.status(500).json({ message: message , error : error });
}

export async function create( req, res ) {
    // console.log( " 요청 옴 ");
    // console.log(req.body );
    // console.log(req.files);

    const body = req.body;
    const { success , message, data, error } = await store( body );
    success === true ? 
    res.status(200).json({ message: message , data : data}) : 
    res.status(500).json({ message: message , error : error });
}