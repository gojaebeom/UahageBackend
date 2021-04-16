import { query } from "../../config/database.js";

export async function login( body ){
    let sql = `select * from users`;
    return query( sql )
        .then( data => { 
            return { success : true, message : "finded successfully", data : data};
        })
        .catch( err => {
            return { success : false, message : "Could not find data", error : err };
        });
    }