"use strict"
import { query } from "../../../config/database.js";

export function findAll() {
    let sql = `
    select 
        id, 
        nickname, 
        email, 
        profile_url, 
        baby_gender, 
        baby_birthday, 
        parent_age, 
        created_at
    from users
    order by id desc`;
    return query(sql)
        .then( data => {
            const count = data.rowCount;
            const _data = data.rows;
            return { success : true , result : { count : count , data : _data } }
        })
        .catch( error => {
            return { success : false, result : error }
        });
}
export function findOne( id ) {
    let sql = `
    select 
        id, 
        nickname, 
        email, 
        profile_url, 
        baby_gender, 
        baby_birthday, 
        parent_age, 
        created_at
    from users
    where id = ${ id }`;
    console.log(`최종 query ${ sql }`);
    return query(sql)
        .then( data => {
            if(data.rowCount === 0) 
                return { success : true , result : false }
            return { success : true , result : data.rows[0] }
        })
        .catch( error => {
            return { success : false, result : error }
        });
}

export async function findbyOptions( options ) {
    /**
     * @options
     * search : search, 닉네임값을 포함하는 여부로 검색
     * page :  페이지 번호 
     * sort : order by , asc or desc
     * bg : baby_gender
     * bb : baby_birthday
     * pa : parent_age
     */
    const { search, page, sort, bg, bb, pa } = options;
    let sql = `
    select 
        count(*) over() as total, 
        id, 
        nickname, 
        email, 
        baby_gender, 
        baby_birthday, 
        parent_age,
        profile_url, 
        created_at
    from users `;

    // search, is_verified, roles 는 where 절에 들어가기 때문에 셋중에 하나라도 존재하면 
    // sql 문에 where 문 추가
    if( search || bg || bb || pa ) {
        sql += ` where`;
        // search 값이 존재할 경우
        if( search ) {
            sql += ` nickname like '%${search}%'`;
        }
        // baby gender
        if( bg ) {
            // 이전에 search key가 있다면 and 키워드 추가
            search ? 
            sql += ` and baby_gender = '${bg}'` :
            sql += ` baby_gender = '${bg}'`;
        }
        // // baby birthday
        // if( bb ) {
        //     // 이전에 search 또는 iv key 가 있다면 and 키워드 추가
        //     search || bg ? 
        //     sql += ` and baby_birthday = '${bb}'` :
        //     sql += ` baby_birthday = '${bb}'`;
        // }
        // parent age
        if( pa ) {
            // 이전에 search or bg or bb 가 존재할 경우 and 키워드 추가
            search || bg || bb ?
            sql += ` and parent_age = '${pa}'` :
            sql += ` parent_age = '${pa}'`;
        }
    }

    sort ? 
    // 정렬 타입이 존재할 경우
    sql += ` order by id ${sort}` :
    // 존재하지 않으면 최신순을 기본으로 설정 
    sql += ` order by id desc`; 

    page ? 
    // 페이지 번호가 존재할 경우
    sql += ` limit 5 offset ${((Number(page)-1)*5)}` :
    // 존재하지 않으면 첫번째 페이지를 기본으로 설정
    sql += ` limit 5 offset 0`;

    console.log(`최종 query ${ sql }`);

    return query(sql)
        .then( data => {
            const count = data.rowCount;
            const _data = data.rows;
            return { success : true , result : { count : count , data : _data } }
        })
        .catch( error => {
            return { success : false, result : error }
        });
}

export function store() {
    let sql = ``;
    return query(sql)
        .then( data => {
            return { success : true , result : data }
        })
        .catch( error => {
            return { success : false, result : error }
        });
}

export function edit( body, id ) {
    let sql = `
    update users set `;
    let values = Object.values(body);
    let count = 0;
    for (let key in body) {
        sql += ` ${key} = '${values[count]}' ,`;
        count++;
    }
    sql += ` updated_at = current_timestamp where id = ${id}`;
    return query(sql)
        .then( data => {
            return { success : true , result : data }
        })
        .catch( error => {
            return { success : false, result : error }
        });
}

export function destory( id ) {
    let sql = `delete from users where id = ${ id }`;
    return query(sql)
        .then( data => {
            return { success : true , result : data }
        })
        .catch( error => {
            return { success : false, result : error }
        });
}