"use strict"
import { query } from "../../config/database.js";

export async function show(  user_id ,place_id ){
let SQL;
console.log(place_id);
   SQL = place_id ?  `
    select * from users_places_bookmarks where user_id = ${ user_id  } and place_id = ${ place_id } ;
    ` : `select p.id, p.name, p.address, p.phone, p.place_code AS type, 
        p.add_info -> 'examination'AS examination,  \
        p.add_info -> 'fare' AS fare, \
        p.add_info -> 'carriage' AS carriage,
        p.add_info -> 'bed' AS bed,
        p.add_info -> 'tableware' AS tableware,
        p.add_info -> 'nursingroom' AS nursingroom,
        p.add_info -> 'meetingroom' AS meetingroom,
        p.add_info -> 'diapers' AS diapers,
        p.add_info -> 'playroom'AS playroom, 
        p.add_info -> 'chair'AS chair,
        p.add_info -> 'menu'AS menu, 1 AS bookmark \
        from users_places_bookmarks up JOIN places p ON up.place_id = p.id where up.user_id = ${ user_id  };`;
        
       
    return  query( SQL )
    .then( data => { 
    return { success : true, message : "Selected successfully", data : data};
    })
    .catch( err => {
        return { success : false, message : "Could not select", error : err };
    });
} 

export async function store(  user_id ,place_id ){
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


