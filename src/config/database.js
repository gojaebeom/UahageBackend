"use strict"

// import mysql module ✨
const { createPool } = require("mysql");

// connection or createPool description ✨
// https://blog.naver.com/geguman/220549771473
const pool = createPool({
    port : process.env.MYSQL_PORT,
    host : process.env.MYSQL_HOST,
    user : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASS,
    database : process.env.APP_MODE === 'PORD' ? process.env.MYSQL_DB : process.env.MYSQL_DB_DEV
});

/**
 * query reuse ✨
 * @param {*} query : sql 리터럴 
 * @param {*} params : ? 와 상응하는 데이터의 배열
 * @returns {promise} reject -> err code , resolve -> success data 
 */  
exports.query = function(query, params){
    return new Promise((resolve, reject)=>{
        pool.query(query, params, (err, result) => {
            if(err) reject(err);
            else resolve(result);
        });
    });
}