"use strict"
import { findAll, findOne, findbyOptions, store, edit, destory } from "./user.repository.js";

export async function index(req, res) {
    const querystring = req.query;
    console.log( querystring );
    const keys = Object.keys(querystring);

    let success, result;
    if( keys.length === 0 ) {
        console.log("default");
        const resultObj = await findAll();
        success = resultObj.success;
        result = resultObj.result;
    }else {
        console.log("filter");
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
    const id = req.params.id;
    const body = req.body;
    console.log( id );
    console.log( body );
    //id, email 은 수정금지
    if( body.id || body.email) return res.status(403).json({ message: "is not allowed"  });
    const { success , result } = await edit( body, id );

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
    const id = req.params.id;
    const { success , result } = await destory( id ); 
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