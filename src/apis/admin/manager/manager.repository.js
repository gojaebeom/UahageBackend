"use strict"
import { query } from "../../../config/database.js";

export function findAll() {
    let sql = `
    select id, nickname, email, is_verified, roles, created_at
    from managers
    where is_deleted = 0
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
    select id, nickname, email, is_verified, roles, created_at
    from managers
    where is_deleted = 0
    and id = ${ id }`;
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
     * iv : is_verified , 관리자 승인여부
     * ro : roles, 권한
     */
    const { search, page, sort, iv, ro } = options;
    let sql = `
    select count(*) over() as total, id, nickname, email, roles, is_verified, created_at
    from managers 
    where is_deleted = 0`;

    // search, is_verified, roles 는 where 절에 들어가기 때문에 셋중에 하나라도 존재하면 
    // sql 문에 where 문 추가
    if( search || iv || ro ) {
        // sql += ` where`;
        // search 값이 존재할 경우
        if( search ) {
            sql += ` and nickname like '%${search}%'`;
        }
        // is_verified 값이 존재할 경우
        if( iv ) {
            // 이전에 search key가 있다면 and 키워드 추가
            // search ? 
            // sql += ` and is_verified = ${iv}` :
            // sql += ` is_verified = ${iv}`;
            sql += ` and is_verified = ${iv}`;
        }
        // roles 값이 존재할 경우
        if( ro ) {
            // 이전에 search 또는 iv key 가 있다면 and 키워드 추가
            // search || iv ? 
            // sql += ` and roles = '${ro}'` :
            // sql += ` roles = '${ro}'`;

            sql += ` and roles = '${ro}'`;
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
    update managers set `;
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

export function destory( id ){
    let sql = `
    update managers 
    set is_deleted = 1,
    deleted_at = current_timestamp
    where id = ${ id }`;
    return query(sql)
        .then( data => {
            return { success : true , result : data }
        })
        .catch( error => {
            return { success : false, result : error }
        });
}

export function destoryStep2( id ){
    let sql = `delete from managers where id = ${ id }`;
    return query(sql)
        .then( data => {
            return { success : true , result : data }
        })
        .catch( error => {
            return { success : false, result : error }
        });
}