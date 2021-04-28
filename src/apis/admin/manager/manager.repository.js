"use strict"
import { query } from "../../../config/database.js";

export function findAll() {
    let sql = `
    select id, profile_path, nickname, email, is_verified, roles, created_at
    from managers
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
    select id, profile_path, nickname, email, is_verified, roles, created_at
    from managers
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
     * iv : is_verified , 관리자 승인여부
     * ro : roles, 권한
     */
    const { search, page, sort, iv, ro } = options;
    let sql = `
    select count(*) over() as total,  id, profile_path, nickname, email, roles, is_verified, created_at
    from managers `;

    // search, is_verified, roles 는 where 절에 들어가기 때문에 셋중에 하나라도 존재하면 
    // sql 문에 where 문 추가
    if( search || iv || ro ) {
        sql += ` where`;
        // search 값이 존재할 경우
        if( search ) {
            sql += ` nickname like '%${search}%'`;
        }
        // is_verified 값이 존재할 경우
        if( iv ) {
            // 이전에 search key가 있다면 and 키워드 추가
            search ? 
            sql += ` and is_verified = ${iv}` :
            sql += ` is_verified = ${iv}`;
        }
        // roles 값이 존재할 경우
        if( ro ) {
            // 이전에 search 또는 iv key 가 있다면 and 키워드 추가
            search || iv ? 
            sql += ` and roles = '${ro}'` :
            sql += ` roles = '${ro}'`;
        }
    }

    // 위의 필터 처리가 된 쿼리를 먼저 요청하여 
    // 전체 개수 받아오기 ( view 쪽에서 필터에 따른 전체 페이지 개수를 구하기 위함 )
    // 아래 코드에서 limit를 처리한 시점에선 전체 페이지를 구해올 수 없음
    // const { success, totalCount } = await query(sql)
    //     .then( data => {
    //         const count = data.rowCount;
    //         return { success : true , totalCount : count }
    //     })
    //     .catch( error => {
    //         return { success : false }
    //     });
    // // 쿼리 에러시 success : false 를 리턴하여 컨트롤러단에서 쿼리 에러 응답
    // if( !success ) return { success : false };

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

export function destory( id ) {
    let sql = `delete from managers where id = ${ id }`;
    return query(sql)
        .then( data => {
            return { success : true , result : data }
        })
        .catch( error => {
            return { success : false, result : error }
        });
}