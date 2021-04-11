"use strict"

const { query } = require("../../config/database");

exports.findAll = async ( ) => {
    const SQL = `
    select * 
    from users
    `;
    return query(SQL)
        .then( data => { 
            return { success : true, message : "finded successfully", data : data};
        })
        .catch( err => {
            return { success : false, message : "Could not find data", error : err };
        });
}

exports.findOne = async ( id ) => {
    const SQL = `
    select * 
    from users 
    where id = ?
    `;
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

    return await query(SQL, [ whereData ])
        .then( data => { 
            if( selectType === "boolean" )
                if( data.length === 0 ) return { success : true, message : "finded successfully", data : false};
                else  return { success : true, message : "finded successfully", data : true};
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
        [ nickname, gender, birthday, age, email, URL])
        .then( data => { // query에서 resolve 반환됨
            console.log(data.affectedRows);
            if( data.affectedRows === 1 ) return {  success : true, message : "created successfully", data : data };
            else return {  success : false, message : "Could not create", error : err };
        })
        .catch( err => { // query에서 reject가 반환됨
            return {  success : false, message : "Could not create", error : err };
        });
} 

exports.updateAll = async ( nickname , body ) => {
    const SQL = `
    update users AS a, 
    (select email from users where id = ? ) as b 
    set a.nickname = ?, a.gender = ?, a.baby_birthday = ?, a.parent_age = ?, a.updated_at = now() 
    where a.email = b.email;`;
    /** 
    * @README 💡
    ------------------------------------------------------------------
    sql 문을 단순히 
    update users 
    set nickname = ?, gender = ?, baby_birthday = ?, parent_age=?, updated_at = now()
    where id = ? 
    로 바꿔도 되는 부분일까요?
    ------------------------------------------------------------------*/
    const { userId, gender, birthday, age } = body;
    console.log(userId, gender, birthday, age);
    return await query(
        SQL,
        [userId, nickname, gender, birthday, age])
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