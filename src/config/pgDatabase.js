const { Client } = require("pg");

const client = new Client({
    host : process.env.PGSQL_HOST,
    user : process.env.PGSQL_USER,
    password : process.env.PGSQL_PASS,
    database : process.env.PGSQL_DB,
    port : process.env.PGSQL_PORT,
    ssl : {
        rejectUnauthorized : false
    }
});

client.connect(err => { 
    if (err) { 
        console.log('Failed to connect db ' + err);
    } else { 
        console.log('Connect to pg-db done!');
    } 
});

exports.query = function(query, params){
    return new Promise((resolve, reject) => {
        client.query(query, params, ( err, result ) => {
            if(err) reject(err);
            else resolve(result);
        });
    });
}