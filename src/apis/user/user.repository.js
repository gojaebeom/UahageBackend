"use strict"
import { compareSync } from "bcrypt";
import {
    query
} from "../../config/database.js";

export async function findAll() {
    let sql = `
    select *  
    from public.users`;
    return query(sql)
        .then(data => {
            return {
                success: true,
                message: "finded successfully",
                data: {
                    count: data.rowCount,
                    result: data.rows
                }
            };
        })
        .catch(err => {
            return {
                success: false,
                message: "Could not find data",
                error: err
            };
        });
    }
export async function findOne(id) {
    let sql = `
    select *
    from users
    where id = ${id}`;
    return query(sql)
        .then(data => {
            return {
                success: true,
                message: "finded successfully",
                data: {
                    count: data.rowCount,
                    result: data.rows
                }
            };
        })
        .catch(err => {
            return {
                success: false,
                message: "Could not find data",
                error: err
            };
        });
}

// 하나의 조건으로 정보 있는지 검사 🥕
export async function findByOption(option, optionData) {
    let sql = `
    select *
    from users
    where ${option} = '${optionData}';`;
    console.log(sql);
    return query(sql)
        .then(data => {
            return {
                success: true,
                message: "finded successfully",
                isdata: data.rowCount,
                data: data.rows[0]
                // 결과 존재하지않을때 isdata 0
            };
        })
        .catch(err => {
            // 쿼리 에러
            return {
                success: false,
                message: "Could not find data",
                error: err
            };
        });
}
//🥕


export async function store(body) {
    const {
        email,
        nickname,
        gender,
        birthday,
        age,
        URL
    } = body;
    let sql = `
    insert into users(email, nickname, baby_gender, baby_birthday, parent_age, profile_url) 
    values ('${email}', '${nickname}', '${gender}', '${birthday}','${age}','${URL}')`;
 
    return await query(sql)
        .then(data => { // query에서 resolve 반환됨
            return {
                success: true,
                message: "created successfully",
                data: data
            }
            
        })
        .catch(err => { // query에서 reject가 반환됨
            return {
                success: false,
                message: "Could not create",
                error: err
            };
        });
}

export async function updateAll(id, body) {
    const {
        nickname,
        gender,
        birthday,
        age,
        rf_token
    } = body;

    let sql = `
    update users 
    set nickname = '${nickname}', baby_gender = '${gender}', baby_birthday = '${birthday}', parent_age=${age}, rf_token = '${rf_token}', updated_at = current_timestamp
    where id = ${id};`;

    console.log(nickname, gender, birthday, age, rf_token);
    return await query(
        sql
    )
        .then(data => { // query에서 resolve 반환됨
            return {
                success: true,
                message: "Updated successfully",
                data: data
            };
        })
        .catch(err => { // query에서 reject가 반환됨
            return {
                success: false,
                message: "Could not update",
                error: err
            };
        });
}

export async function updateByOptions(id, body) {
    let sql = `
    update users set `; //끝에 공백 필요
    let values = Object.values(body);
    let count = 0;
    for (let key in body) {
        sql += ` ${key} = '${values[count]}' ,`;
        count++;
    }
    sql += ` updated_at = current_timestamp where id = ${id};`;

    return await query(
        sql)
        .then(data => { // query에서 resolve 반환됨
            return {
                success: true,
                message: "Updated successfully",
                data: data
            };
        })
        .catch(err => { // query에서 reject가 반환됨
            return {
                success: false,
                message: "Could not update",
                error: err
            };
        });
}

// export async function profileImage(id,  profile_url){
//     let sql = `update users`
// }

export async function destroy(id) {
    let sql = `
    delete from users 
    where id = ${id}`;
    return query(sql)
        .then(data => { // query에서 resolve 반환됨
            return {
                success: true,
                message: "deleted successfully",
                data: data
            };
        })
        .catch(err => { // query에서 reject가 반환됨
            return {
                success: false,
                message: "Could not delete",
                error: err
            };
        });
}