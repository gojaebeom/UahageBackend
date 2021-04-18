"use strict"
import { query } from "../../config/database.js";

export async function findAll ( ){
    let sql = `
    select id, email, nickname, profile_url  
    from public.users`;
    return query( sql ) 
        .then( data => {
            return { success : true, message : "finded successfully", data : { count : data.rowCount, result : data.rows }};
        })
        .catch( err => {
            return { success : false, message : "Could not find data", error : err };
        });
}

export async function findOne ( id ){
    let sql = `
    select id, email, nickname, profile_url
    from public.users 
    where id = ${ id }`;
    return query( sql )
        .then( data => { 
            return { success : true, message : "finded successfully", data : { count : data.rowCount, result : data.rows }};
        })
        .catch( err => {
            return { success : false, message : "Could not find data", error : err };
        });
}

export async function findByOptions ( options ){
    const { select, selectType, whereColumn, whereData } = options;
    
    let sql =`
    select ${select} 
    from users`;

    if(whereColumn && whereData) sql = `select ${select} from users where ${whereColumn} = ${whereData}`;

    return await query( sql )
        .then( data => { 
            if( selectType === "boolean" )
                if( data.length === 0 ) return { success : true, message : "사용가능한 닉네임", data : false};
                else  return { success : true, message : "이미 존재하는 닉네임", data : true};
            else{
                return { success : true, message : "finded successfully", data : data};
            }
        })
        .catch( err => {
            console.log(err.errno);
            if(err.errno === 1054) return { success : false, message : err.sqlMessage, error : err ,code : 404 };
            return { success : false, message : "Could not find data", error : err };
        });
}

export async function store ( body ){
    let sql = `
    insert into users(email, nickname, gender, baby_birthday, parent_age, profile_image) 
    values ('${email}', '${nickname}', ${gender}, ${birthday},${age},${URL})`;
    const { email, nickname, gender, birthday, age, URL } = body;
    return await query( sql )
        .then( data => { // query에서 resolve 반환됨
            console.log(data.affectedRows);
            if( data.affectedRows === 1 ) return {  success : true, message : "created successfully", data : data };
            else return {  success : false, message : "Could not create", error : err };
        })
        .catch( err => { // query에서 reject가 반환됨
            return {  success : false, message : "Could not create", error : err };
        });
} 

export async function updateAll ( id , body ){
    let sql = `
    update users 
    set nickname = ?, gender = ?, baby_birthday = ?, parent_age=?, updated_at = now()
    where id = ?;`;
                
    const { nickname, gender, birthday, age } = body;
    console.log(nickname, gender, birthday, age);
    return await query(
        sql,
        [ nickname, gender, birthday, age , id])
        .then( data => { // query에서 resolve 반환됨
            return {  success : true, message : "Updated successfully", data : data };
        })
        .catch( err => { // query에서 reject가 반환됨
            return {  success : false, message : "Could not update", error : err };
        });
}

export async function updateByOptions ( id, body ){
    let sql = `
    update users
    set `;//끝에 공백 필요
    let values = Object.values(body);
    for(let key in body){
        sql += ` ${key} = ? ,`;
    }
    sql += `updated_at = now() where id = ?;`;
    console.log(sql);
    return await query(
        sql , [...values, id])
        .then( data => { // query에서 resolve 반환됨
            return {  success : true, message : "Updated successfully", data : data };
        })
        .catch( err => { // query에서 reject가 반환됨
            return {  success : false, message : "Could not update", error : err };
        });
}

export async function destroy ( id ){
    let sql = `
    delete from users 
    where id = ${ id }`;
    return query( sql )
        .then( data => { // query에서 resolve 반환됨
            return {  success : true, message : "deleted successfully", data : data };
        })
        .catch( err => { // query에서 reject가 반환됨
            return {  success : false, message : "Could not delete", error : err };
        });
}