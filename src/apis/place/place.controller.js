"use strict"
import { compareSync } from "bcrypt";
import { findAll, findOne } from "./place.repository.js";

export async function index( req, res ){
    const { place_code , lat, lon , pageNumber } = req.query;
    console.log('controller index');
    console.log(place_code , lat, lon , pageNumber);
    const { success , message, data, error } = await findAll(place_code, lat, lon, pageNumber);
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