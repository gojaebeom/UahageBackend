"use strict"

import { query } from "../../config/database.js";

// email을 검색하여 email, password 반환( 없으면 false 반환 )
export async function findLoginInfo( email ) {
    console.log( email );
    let sql = `
    select id, email, password
    from users 
    where email = '${email}'`;

    return await query(sql)
        .then( data => {
            if( data.rowCount === 0 ) return  { success : true , result : false };
            return { success : true , result : data.rows };
        })
        .catch( error => {
            return { success : false , result : error};
        });
}

// email, password 를 받아 유저 저장
export async function store( email, password ){
    let sql = `
    insert into
    users(email, password)
    values('${email}', '${password}')`;

    return await query(sql)
        .then( data => {
            return { success : true , result : true };
        })
        .catch( error => {
            return { success : false , result : error};
        });
}