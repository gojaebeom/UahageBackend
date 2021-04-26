"use strict"

import { findByOption } from "../../user/user.repository.js";
import { findAll, findOne, findbyOptions, store, edit, destory } from "./manager.repository.js";

export async function index(req, res) {
    const querystring = req.query;
    const keys = Object.keys(querystring);

    let success, result;

    if( keys.length === 0 ) {
        console.log("보통 타입으로 넘어감");
        const resultObj = await findAll();
        success = resultObj.success;
        result = resultObj.result;
    }else {
        console.log("검색 타입으로 넘어감");
        const resultObj = await findbyOptions( querystring );
        success = resultObj.success;
        result = resultObj.result;
    }
    
    ! success ?
    // err 
    res.status(500).json({
        message : "system err",
        result : result
    }) :
    // ok
    res.status(200).json({
        message : "ok",
        result : result
    });
}

export async function show(req, res) {
    const id = req.params.id;
    console.log(` 요쳥 id ${ id }`);
    const { success , result } = await findOne( id ); 

    ! success ?
    // err 
    res.status(500).json({
        message : "system err",
        result : result
    }) :
    // ok
    res.status(200).json({
        message : "ok",
        result : result
    });
}

export async function create(req, res) {
    const { success , result } = await store(); 

    ! success ?
    // err 
    res.status(500).json({
        message : "system err",
        result : result
    }) :
    // ok
    res.status(200).json({
        message : "ok",
        result : result
    });
}

export async function update(req, res) {
    const { success , result } = await edit(); 

    ! success ?
    // err 
    res.status(500).json({
        message : "system err",
        result : result
    }) :
    // ok
    res.status(200).json({
        message : "ok",
        result : result
    });
}

export async function _delete(req, res) {
    const { success , result } = await destory(); 

    ! success ?
    // err 
    res.status(500).json({
        message : "system err",
        result : result
    }) :
    // ok
    res.status(200).json({
        message : "ok",
        result : result
    });
}