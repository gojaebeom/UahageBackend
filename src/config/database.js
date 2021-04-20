// import pkg from "pg";
// const { Client } = pkg;
import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const client = new pg.Client({
    host : process.env.PGSQL_HOST,
    user : process.env.PGSQL_USER,
    password : process.env.PGSQL_PASS,
    database : process.env.PGSQL_DB,
    port : process.env.PGSQL_PORT,
    ssl : {
        rejectUnauthorized : false
    }
});

export default function postgreConnector(){
    client.connect(err => { 
        if (err) { 
            console.log('Failed to connect db ' + err);
        } else { 
            console.log('Connect to pg-db done!');
        } 
    });
}

export function query( query ){
    console.log(query);
    return new Promise((resolve, reject) => {
        client.query( query, ( err, result ) => {
            if(err) reject(err);
            else resolve(result);
        });
    });
}