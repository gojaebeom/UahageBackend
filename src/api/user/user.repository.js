"use strict"
const { query } = require("../../config/database");

exports.findAll = async ( ) => {
    const SQL = `select * from users`;
    return query(SQL) 
        .then( data => {
            return { success : true, message : "finded successfully", data : data};
        })
        .catch( err => {
            return { success : false, message : "Could not find data", error : err };
        });
}

exports.findOne = async ( id ) => {
    const SQL = `select * from users where id = ?`;
    return query(SQL, [ id ])
        .then( data => { 
            return { success : true, message : "finded successfully", data : data};
        })
        .catch( err => {
            return { success : false, message : "Could not find data", error : err };
        });
}

exports.findByOptions = async ( options ) => {
    const { select, selectType, whereColumn, whereData } = options;
    let SQL =`select ${select} from users`;

    if(whereColumn && whereData) SQL = `select ${select} from users where ${whereColumn} = ?;`;
    console.log(SQL);
    return await query(SQL, [ whereData ])
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

exports.store = async ( body ) => {
    const SQL = `
    insert into users(email, nickname, gender, baby_birthday, parent_age, profile_image) 
    values (?,?,?,?,?,?);
    `;
    const { email, nickname, gender, birthday, age, URL } = body;
    return await query(SQL, 
        [ email, nickname, gender, birthday, age, URL])
        .then( data => { // query에서 resolve 반환됨
            console.log(data.affectedRows);
            if( data.affectedRows === 1 ) return {  success : true, message : "created successfully", data : data };
            else return {  success : false, message : "Could not create", error : err };
        })
        .catch( err => { // query에서 reject가 반환됨
            return {  success : false, message : "Could not create", error : err };
        });
} 

exports.updateAll = async ( id , body ) => {
    
    const SQL = `update users 
    set nickname = ?, gender = ?, baby_birthday = ?, parent_age=?, updated_at = now()
    where id = ?  ;`;
                
    
    
    const { nickname, gender, birthday, age } = body;
    console.log(nickname, gender, birthday, age);
    return await query(
        SQL,
        [ nickname, gender, birthday, age , id])
        .then( data => { // query에서 resolve 반환됨
            return {  success : true, message : "Updated successfully", data : data };
        })
        .catch( err => { // query에서 reject가 반환됨
            return {  success : false, message : "Could not update", error : err };
        });
}

exports.updateByOptions = async ( id, body ) => {
    const keys = Object.keys(body);
    const values = Object.values(body);
    let SQL = `update users set`;
    // for(let i = 0; i < keys.length; i++){
    //     if( i !== keys.length-1 ) SQL += ` ${keys[i]} = ? ,`; 
    //     else SQL += ` ${keys[i]} = ? `; 
    // }
    // 끝에 컴마(,) 를 제거하기 위해 위와 같이 로직을 작성하였으나
    // 하단 where 절 이전에 항상 updated_at 칼럼이 들어가기 때문에 따로 조건을 주지 않아도 될것 같습니다.
    for(let key in body){
        SQL += ` ${key} = ? ,`;
    }
    SQL += ` updated_at = now() where id = ?;`;
    console.log(SQL);
    return await query(
        SQL , [...values, id])
        .then( data => { // query에서 resolve 반환됨
            return {  success : true, message : "Updated successfully", data : data };
        })
        .catch( err => { // query에서 reject가 반환됨
            return {  success : false, message : "Could not update", error : err };
        });
}

exports.destroy = async ( id ) => {
    const SQL = `delete from users where id = ?`;
    return query(SQL, [ id ])
        .then( data => { // query에서 resolve 반환됨
            return {  success : true, message : "deleted successfully", data : data };
        })
        .catch( err => { // query에서 reject가 반환됨
            return {  success : false, message : "Could not delete", error : err };
        });
}