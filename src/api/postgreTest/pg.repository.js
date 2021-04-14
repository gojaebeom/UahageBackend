const { query } = require("../../config/pgDatabase")

exports.testMode = async ( ) => {
    let sql = "select id, title from public.test";
    return query(sql)
        .then( data => data )
        .catch( error => error );
}