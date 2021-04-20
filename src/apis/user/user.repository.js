"use strict"
import {
    query
} from "../../config/database.js";

export async function findAll() {
    let sql = `
    select id, email, nickname, profile_url  
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
    select id, email, nickname, profile_url, baby_gender,baby_birthday,parent_age
    from public.users 
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

export async function findByOptions(options) {
    /**
     *  @findKeyMatch
     *  em : email 
     *  nn : nickname
     *  bg : baby_gender
     *  bb : baby_birthday
     *  pu : profile_url
     *  pa : parent_age
     *  ca : created_at
     *  ua : updated_at
     */
    const {
        em,
        nn,
        bg,
        bb,
        pu,
        pa,
        ca,
        ua
    } = options;

    let sql = `
    select id, email, nickname, profile_url
    from users
    where`;

    em && sql + ` email = '${em}'`;
    nn && sql + ` nickname = '${nn}'`;
    bg && sql + ` baby_gender = '${bg}'`;
    bb && sql + ` baby_birthday = '${bb}'`;
    pu && sql + ` profile_url = '${pu}'`;
    pa && sql + ` parent_age = '${pa}'`;
    ca && sql + ` created_at = '${ca}'`;
    ua && sql + ` updated_at = '${ua}'`;

    return await query(sql)
        .then(data => {
            return {
                success: true,
                message: "finded successfully",
                data: data
            };
        })
        .catch(err => {
            console.log(err.errno);
            if (err.errno === 1054) return {
                success: false,
                message: err.sqlMessage,
                error: err,
                code: 404
            };
            return {
                success: false,
                message: "Could not find data",
                error: err
            };
        });
}

export async function store(body) {
    let sql = `
    insert into users(email, nickname, gender, baby_birthday, parent_age, profile_image) 
    values ('${email}', '${nickname}', ${gender}, ${birthday},${age},${URL})`;
    const {
        email,
        nickname,
        gender,
        birthday,
        age,
        URL
    } = body;
    return await query(sql)
        .then(data => { // query에서 resolve 반환됨
            console.log(data.affectedRows);
            if (data.affectedRows === 1) return {
                success: true,
                message: "created successfully",
                data: data
            };
            else return {
                success: false,
                message: "Could not create",
                error: err
            };
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
        age
    } = body;

    let sql = `
    update users 
    set nickname = '${nickname}', baby_gender = '${gender}', baby_birthday = '${birthday}', parent_age=${age}, updated_at = current_timestamp
    where id = ${id};`;

    console.log(nickname, gender, birthday, age);
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