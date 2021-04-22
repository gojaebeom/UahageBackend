"use strict"
import { findAll, findOne, AllSearch , PartialSearch } from "./place.repository.js";

export async function search( req, res ){
    const {place_code,type, menu, bed,tableware,meetingroom,diapers,playroom,carriage,nursingroom,chair} = req.query;
    let success , message, data, error;
    if(type==="all"){
        let resultOjbect = await AllSearch(place_code);
        success = resultOjbect.success;
        message = resultOjbect.message;
        data = resultOjbect.data;
        error = resultOjbect.error;
    }else{
        let resultOjbect = await PartialSearch(place_code, menu, bed,tableware,meetingroom,diapers,playroom,carriage,nursingroom,chair);
        success = resultOjbect.success;
        message = resultOjbect.message;
        data = resultOjbect.data;
        error = resultOjbect.error;
    }
    success === true ? 
    res.status(200).json({ message: message , data : data}) : 
    res.status(500).json({ message: message , error : error });
} 

export async function index( req, res ){
    console.log('controller index');
    const { place_code , lat, lon , pageNumber , user_id} = req.query;
    const { success , message, data, error } = await findAll(place_code, lat, lon, pageNumber , user_id);
    success === true ? 
    res.status(200).json({ message: message , data : data}) : 
    res.status(500).json({ message: message , error : error });
} 

export async function show( req, res ){
    const space_code = req.params.id;
    const { success , message, data, error } = await findOne( space_code );
    success === true ? 
    res.status(200).json({ message: message , data : data}) : 
    res.status(500).json({ message: message , error : error });
}

export async function create( req, res ) {
    const body = req.body;
    const { success , message, data, error } = await store( body );
    success === true ? 
    res.status(200).json({ message: message , data : data}) : 
    res.status(500).json({ message: message , error : error });
}