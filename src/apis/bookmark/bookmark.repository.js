"use strict"
import { query } from "../../config/database.js";

export async function store(  user_id ,place_id ){
    console.log(user_id+","+place_id);
    const SQL = `
    insert into users_places_bookmarks( user_id, place_id ) values( ${ user_id  } , ${ place_id } );
    `;
    return  query( SQL )
    .then( data => { 
        return { success : true, message : "created successfully", data : data};
    })
    .catch( err => {
        return { success : false, message : "Could not create", error : err };
    });
} 


export async function destroy( user_id , place_id  ){
    const SQL = `delete from users_places_bookmarks where user_id = ${user_id}  and place_id = ${place_id} and id > 0 `;
    return query(SQL)
        .then( data => { // query에서 resolve 반환됨
            return {  success : true, message : "deleted successfully", data : data };
        })
        .catch( err => { // query에서 reject가 반환됨
          
            return {  success : false, message : "Could not delete", error : err };
        });
      
}


