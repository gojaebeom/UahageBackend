"use strict"

import {
    query
} from "../../config/database.js";

// email을 검색하여 email, password 반환( 없으면 false 반환 )
export async function findLoginInfo(email, nickname) {
    console.log(email, nickname);
    let sql = email ? `
    select id, email, password, nickname
    from users 
    where email = '${email}'` : `select  nickname
    from users 
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
export async function store(email, nickname,gender,birthday,age,URL,  password) {
    age = Number(age);
    let sql = `
    insert into
    users (password, profile_url, baby_gender, baby_birthday, parent_age,email,nickname)
    values('${password}', '${URL}','${gender}','${birthday}','${age}','${email}','${nickname}');`;
    console.log();
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