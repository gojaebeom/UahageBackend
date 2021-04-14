"use strict"

const { query } = require("../../config/database");

exports.store = async ( body ) => {
    const SQL = `
    insert into bookmarks(user_id,space_id) values(?,?);
    `;
    const { user_id , space_id } = body;
    console.log(body);
    return await query(SQL, 
        [ user_id, space_id ])
        .then( data => { // query에서 resolve 반환됨
         if( data.affectedRows === 1 ) return {  success : true, message : "created successfully", data : data };
            else return {  success : false, message : "Could not create", error : err };
        })
        .catch( err => { // query에서 reject가 반환됨
            return {  success : false, message : "Could not create", error : err };
        });
} 


exports.destroy = async ( user_id , space_id  ) => {
    const SQL = `delete from bookmarks where user_id =?  and space_id = ? and id > 0 `;
    return query(SQL, [ user_id ,space_id])
        .then( data => { // query에서 resolve 반환됨
            return {  success : true, message : "deleted successfully", data : data };
        })
        .catch( err => { // query에서 reject가 반환됨
            return {  success : false, message : "Could not delete", error : err };
        });
}

exports.findOne = async ( id ) => {
    const SQL = `
    select * 
    from bookmarks 
    where user_id = ?
    `;
    return query(SQL, [ id ])
        .then( data => { 
            return { success : true, message : "finded successfully", data : data};
        })
        .catch( err => {
            return { success : false, message : "Could not find data", error : err };
        });
}