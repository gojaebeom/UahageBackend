const { query } = require("../../config/database");

exports.findAll = async ( ) => {
    const SQL = `
    select * 
    from users
    `;
    return query(SQL)
        .then( data => { 
            return { success : true, message : "finded successfully", data : data};
        })
        .catch( err => {
            return { success : false, message : "Could not find data", error : err };
        });
}

exports.findOne = async ( id ) => {
    const SQL = `
    select * 
    from users 
    where id = ?
    `;
    return query(SQL, [ id ])
        .then( data => { 
            return { success : true, message : "finded successfully", data : data};
        })
        .catch( err => {
            return { success : false, message : "Could not find data", error : err };
        });
}

exports.findByOptions = async ( options ) => {
    const { result, resultType, whereCol, whereData } = options;

    const SQL =`select ${result} from users`;
    if(whereCol && whereData) SQL =`select ${result} from users where ${whereCol} = ${whereData}`;
    
    return await query(SQL)
        .then( data => { 
            if( resultType === null || resultType === "" || resultType === "default" )
                return { success : true, message : "finded successfully", data : data};
            else if (  resultType === "validate" ){
                if( data === 0 ) return { success : true, message : "finded successfully", data : 0};
                else  return { success : true, message : "finded successfully", data : 0};
            }
        })
        .catch( err => {
            return { success : false, message : "Could not find data", error : err };
        });
}

exports.findNickname = async ( id ) => {
    /** 
    * @README 💡
    ------------------------------------------------------------------
    하단의 sql문 기존 코드는 where 절 다음에 email을 찾고있었습니다. 
    하지만 비교하는 대상은 userId 인데, userId값이 pk가 아닌 email 인가요?
    ------------------------------------------------------------------*/
    const SQL = `
    select nickname 
    from users 
    where id = ?;
    `;
    return await query(SQL, [ id ])
        .then( data => { 
            return { success : true, message : "finded successfully", data : data};
        })
        .catch( err => {
            return { success : false, message : "Could not find data", error : err };
        });
}


exports.store = async ( body ) => {
    const SQL = `
    insert into users(email, nickname, gender, baby_birthday, parent_age, profile_image) 
    values (?,?,?,?,?,?);
    `;
    const { email, nickname, gender, birthday, age, URL } = body;
    return await query(SQL, 
        [ nickname, gender, birthday, age, email, URL])
        .then( data => { // query에서 resolve 반환됨
            console.log(data.affectedRows);
            if( data.affectedRows === 1 ) return {  success : true, message : "created successfully", data : data };
            else return {  success : false, message : "Could not create", error : err };
        })
        .catch( err => { // query에서 reject가 반환됨
            return {  success : false, message : "Could not create", error : err };
        });
} 

exports.updateAll = async ( nickname , body ) => {
    const SQL = `
    update users AS a, 
    (select email from users where id = ? ) as b 
    set a.nickname = ?, a.gender = ?, a.baby_birthday = ?, a.parent_age = ?, a.updated_at = now() 
    where a.email = b.email;`;
    const { userId, gender, birthday, age } = body;
    console.log(userId, gender, birthday, age);
    return await query(
        SQL,
        [userId, nickname, gender, birthday, age])
        .then( data => { // query에서 resolve 반환됨
            return {  success : true, message : "Updated successfully", data : data };
        })
        .catch( err => { // query에서 reject가 반환됨
            return {  success : false, message : "Could not update", error : err };
        });
}