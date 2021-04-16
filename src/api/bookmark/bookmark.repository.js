"use strict"
import { query } from "../../config/database.js";

export async function store( body ){
    const SQL = `
    insert into bookmarks( user_id, place_id ) values( ${ user_id  } , ${ place_id } );
    `;
    const { user_id , place_id } = body;
    console.log(body);
    return await query( SQL )
        .then( data => { // query에서 resolve 반환됨
            if( data.affectedRows === 1 ) return {  success : true, message : "created successfully", data : data };
            else return {  success : false, message : "Could not create", error : err };
        })
        .catch( err => { // query에서 reject가 반환됨
            return {  success : false, message : "Could not create", error : err };
        });
} 


export async function destroy( user_id , place_id  ){
    const SQL = `delete from bookmarks where user_id =?  and place_id = ? and id > 0 `;
    return query(SQL, [ user_id ,place_id])
        .then( data => { // query에서 resolve 반환됨
            return {  success : true, message : "deleted successfully", data : data };
        })
        .catch( err => { // query에서 reject가 반환됨
            return {  success : false, message : "Could not delete", error : err };
        });
}

export async function findOne( id ){
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