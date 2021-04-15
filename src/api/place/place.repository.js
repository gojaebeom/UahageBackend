"use strict"
import { query } from "../../config/database.js";

export async function findAll( ){
    let SQL = `
    select name, address, phone, lat, lon, add_info
    from places`;
    return query(SQL)
        .then( data => { 
            return { success : true, message : "finded successfully", data : data};
        })
        .catch( err => {
            return { success : false, message : "Could not find data", error : err };
        });
}

export async function findOne( place_code ){
    let SQL = `
    select name, address, phone, lat, lon, add_info`;
    switch(place_code) {
        case '1' : SQL += `
            from places 
            where place_code = 1
            `;
            break;
        case '2' : SQL += `
            from places 
            where place_code = 2
            `;
            break;
        case '5' : SQL += `
            from places 
            where place_code = 5
            `;
            break;
        case '6' : SQL += `
            from places 
            where place_code = 6
            `;
            break;
        default : null;
    }
    return query(SQL)
        .then( data => { 
            return { success : true, message : "finded successfully", data : data};
        })
        .catch( err => {
            return { success : false, message : "Could not find data", error : err };
        });
}

export async function store( body ){
    const { place_code, name, address, phone, lat, lon, add_info } = body;
    let sql = `
    insert into places(place_code, name, address, phone, lat, lon, add_info)
    values ( ${ place_code }, '${ name }', '${ address }', '${ phone }', '${ lat }', '${ lon }', '${ add_info }' )
    `;
    return query(sql)
    .then( data => { 
        return { success : true, message : "finded successfully", data : data};
    })
    .catch( err => {
        return { success : false, message : "Could not find data", error : err };
    });
}