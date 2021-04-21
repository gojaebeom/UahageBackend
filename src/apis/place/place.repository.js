"use strict"
import { compareSync } from "bcrypt";
import { query } from "../../config/database.js";

//🥕
export async function AllSearch( place_code ){
    console.log("AllSearch");
    let SQL = `
    select name, address, phone, lat, lon,`;
    switch(place_code) {
        case '1' : SQL += `
            add_info -> 'carriage' AS carriage,
            add_info -> 'bed' AS bed,
            add_info -> 'tableware' AS tableware,
            add_info -> 'nursingroom' AS nursingroom,
            add_info -> 'meetingroom' AS meetingroom,
            add_info -> 'diapers' AS diapers,
            add_info -> 'playroom'AS playroom, 
            add_info -> 'chair'AS chair,
            add_info -> 'menu'AS menu
            from places 
            where place_code = 1;
            `;
            break;
        case '2' : SQL += `
            add_info -> 'examination'AS examination
            from places 
            where place_code = 2;
            `;
            break;
        // case '3' : SQL += `
        //     add_info -> 'fare'AS fare
        //     from places 
        //     where place_code = 3;
        //     `;
        //     break;
        case '5' : SQL += `
            add_info -> 'fare'AS fare
            from places 
            where place_code = 5;
            `;
            break;
        case '6' : SQL += `
            add_info -> 'fare'AS fare
            from places 
            where place_code = 6;
            `;
            break;
        default : null;
    }
  
    console.log(SQL);
    return query(SQL)
        .then( data => { 
            return { success : true, message : "finded successfully", data : data};
        })
        .catch( err => {
            return { success : false, message : "Could not find data", error : err };
        });
}
export async function PartialSearch( place_code , menu, bed,tableware,meetingroom,diapers,playroom,carriage,nursingroom,chair ){
    console.log("PartialSearch");
    const option = [
        'menu',
        'bed',
        'tableware',
        'meetingroom',
        'diapers',
        'playroom',
        'carriage',
        'nursingroom',
        'chair'
    ];
    const options = [
        menu,
        bed,
        tableware,
        meetingroom,
        diapers,
        playroom,
        carriage,
        nursingroom,
        chair
    ];
   
    let SQL = `
    select name, address, phone, lat, lon,`;
    switch(place_code) {
        case '1' : SQL += `
            add_info -> 'carriage' AS carriage,
            add_info -> 'bed' AS bed,
            add_info -> 'tableware' AS tableware,
            add_info -> 'nursingroom' AS nursingroom,
            add_info -> 'meetingroom' AS meetingroom,
            add_info -> 'diapers' AS diapers,
            add_info -> 'playroom'AS playroom, 
            add_info -> 'chair'AS chair,
            add_info -> 'menu'AS menu
            from places 
            where place_code = 1
            `;
            break;
        case '2' : SQL += `
            add_info -> 'examination'AS examination
            from places 
            where place_code = 2
            `;
            break;
        case '3' : SQL += `
            add_info -> 'fare'AS fare
            from places 
            where place_code = 5
            `;
            break;
        case '5' : SQL += `
            add_info -> 'fare'AS fare
            from places 
            where place_code = 5
            `;
            break;
        case '6' : SQL += `
            add_info -> 'fare'AS fare
            from places 
            where place_code = 6 
            `;
            break;
        default : null;
    }
    let SQLADD = "";
    for (let i = 0; i < options.length; i++) {
        if (options[i] =='1') {
            SQLADD = "and  add_info ->> '" + option[i] + "' = '1' ";
            SQL += SQLADD;
            }
       
    };
    SQL+=";";
    console.log(SQL);
    return query(SQL)
        .then( data => { 
            return { success : true, message : "finded successfully", data : data};
        })
        .catch( err => {
            return { success : false, message : "Could not find data", error : err };
        });
}
//🥕


export async function findAll(place_code, lat, lon ,pageNumber,user_id ){
    
    let SQL = `
    select name, address, phone,`;
    switch(place_code) {
        case '1' : SQL += `
            add_info -> 'carriage' AS carriage,
            add_info -> 'bed' AS bed,
            add_info -> 'tableware' AS tableware,
            add_info -> 'nursingroom' AS nursingroom,
            add_info -> 'meetingroom' AS meetingroom,
            add_info -> 'diapers' AS diapers,
            add_info -> 'playroom'AS playroom, 
            add_info -> 'chair'AS chair,
            add_info -> 'menu'AS menu,
            b.id AS bookmark
            from places s left outer join (
                select * from users_places_bookmarks  where user_id =${user_id}) as b on s.id =b.place_id 
           where place_code = 1
            `;
            break;
        case '2' : SQL += `
            add_info -> 'examination'AS examination,
            b.id AS bookmark
            from places s left outer join (
                select * from users_places_bookmarks  where user_id =${user_id}) as b on s.id =b.place_id 
            where place_code = 2
            `;
            break;
       /* case '3' : SQL += `
            add_info -> 'fare'AS fare,
            b.id AS bookmark
            from places 
            where place_code = 5
            `;
            break; */
        case '5' : SQL += `
            add_info -> 'fare'AS fare,
            b.id AS bookmark
            from places s left outer join (
                select * from users_places_bookmarks  where user_id =${user_id}) as b on s.id =b.place_id 
            where place_code = 5
            `;
            break;
        case '6' : SQL += `
            add_info -> 'fare'AS fare,
            b.id AS bookmark
            from places s left outer join (
                select * from users_places_bookmarks  where user_id =${user_id}) as b on s.id =b.place_id 
            where place_code = 6
            `;
            break;
        default : null;
    }
    SQL += `order by  ST_DistanceSphere(geom, ST_MakePoint(`+lon+`,`+lat+`)) LIMIT 10 OFFSET ` + pageNumber*10+`;`;
    console.log(SQL);
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