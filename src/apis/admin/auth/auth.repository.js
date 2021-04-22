"use strict"

import { query } from "../../../config/database.js";

// 첫번째 유저인지 판별 ( 첫번째 유저이면 superuser로 설정 )
export async function isSuperuser( ){
    let sql = `
    select id
    from managers`;

    return await query(sql)
        .then(data => {
            //console.log(data);
            if (data.rowCount === 0) {
                return {
                    success: true,
                    result: true
                } 
            }
            else {
                return {
                    success: true,
                    result: false
                };
            }
        })
        .catch(error => {
            console.log(error);
            return {
                success: false,
                result: error
            };
        });
}

// email을 검색하여 email, password 반환( 없으면 false 반환 )
export async function findLoginInfo(email, nickname) {
    let sql = email ? `
    select id, email, nickname, password, roles
    from managers 
    where email = '${email}'` : `select  nickname
    from managers 
    where nickname = '${nickname}'`;

    return await query(sql)
        .then(data => {
            //console.log(data);
            if (data.rowCount === 0) return {
                success: true,
                result: false
            };
            return {
                success: true,
                result: data.rows
            };
        })
        .catch(error => {
            console.log(error);
            return {
                success: false,
                result: error
            };
        });
}

// email, password 를 받아 유저 저장
export async function store( email, password, nickname, roles ) {
    let sql = `
    insert into
    managers ( email, password, nickname, roles  )
    values( '${email}','${password}','${nickname}','${roles}');`;
    return await query(sql)
        .then(data => {
            return {
                success: true,
                result: true
            };
        })
        .catch(error => {
            return {
                success: false,
                result: error
            };
        });
}