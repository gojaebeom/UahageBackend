"use strict"

const { query } = require("../../config/database");

exports.findOne = async ( space_code ) => {
    let SQL = `select  space_name, addr, phone, lat, lon, `;
    switch(space_code) {
        case '1' : SQL += `
            json_extract(add_info, '$."bed"') as "bed",
            json_extract(add_info, '$."menu"') as "menu",
            json_extract(add_info, '$."chair"') as "chair",
            json_extract(add_info, '$."diapers"') as "diapers",
            json_extract(add_info, '$."carriage"') as "carriage",
            json_extract(add_info, '$."playroom"') as "playroom",
            json_extract(add_info, '$."tableware"') as "tableware",
            json_extract(add_info, '$."meetingroom"') as "meeingroom",
            json_extract(add_info, '$."nursingroom"') as "nursingroom"
            from spaces 
            where space_code = ?
            `;
            break;
        case '2' : SQL += `
            json_extract(add_info, '$."examination"') as "examination"
            from spaces 
            where space_code = ?
            `;
            break;
        case '5' : SQL += `
            json_extract(add_info, '$."fare"') as "fare"
            from spaces 
            where space_code = ?
            `;
            break;
        case '6' : SQL += `
            json_extract(add_info, '$."fare"') as "fare"
            from spaces 
            where space_code = ?
            `;
            break;
        default : null;
    }
    return query(SQL, [ space_code ])
        .then( data => { 
            return { success : true, message : "finded successfully", data : data};
        })
        .catch( err => {
            return { success : false, message : "Could not find data", error : err };
        });
}