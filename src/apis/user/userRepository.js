const { queryBuilder } = require("../../configs/database");

// 변경 전 store
// exports.store = ( body ) => {
//     const keys = Object.keys( body );
//     const values = Object.values( body );
//     let query = `
//     insert into
//     users(${keys.map(e => e)})
//     values(${values.map(e => "\'"+e+"\'" )});
//     `;
//     return queryBuilder( query )
//     .then( data => ({ success: true, result : data }))
//     .catch( e => ({ success: false, error : e }));
// }

// 회원가입
exports.store = ({
    email, 
    token, 
    nickname,
    ageGroupType,
    babyGender,
    babyBirthday
}) => {
    const query = `
    with users as (
        insert into users(
            email, 
            token, 
            nickname
        )
        values(
        '${email}',
        '${token}',
        ${ nickname ? "'"+ nickname +"'" : null }
        )
        returning id
    )
    insert into user_details(
        user_id, 
        age_group_type, 
        baby_gender, 
        baby_birthday
    )
    values (
        (select id from users), 
        ${ageGroupType && ageGroupType+','} 
        ${babyGender && '\''+ babyGender +'\','} 
        ${babyBirthday && '\''+ babyBirthday +'\''} 
    );
    `;
    console.log( query );
    return queryBuilder( query )
    .then( data => ({ success: true, result : true }))
    .catch( error => ({ success: false, error : error }));
}

// 회원 프로필 이미지 생성
exports.storeImage = ( userId, imagePath ) => {
    const query = `
    insert into user_images(user_id, image_path)
    values( ${userId}, '${imagePath}' );
    `;
    return queryBuilder( query )
    .then( data => ({ success: true, result : true }))
    .catch( error => ({ success: false, error : error }));
}

// 회원 정보 수정
exports.edit = ( 
    userId,
    nickname="", 
    ageGroupType=6, 
    babyGender="", 
    babyBirthday="" 
) => {
    const query = `
    with users as (
        update users
        set nickname = '${nickname}'
        where id = ${userId}
        returning id
    )
    update user_details as ud
    set age_group_type = ${ageGroupType}, baby_gender= '${babyGender}', baby_birthday = '${babyBirthday}'
    where ud.user_id = (select id from users);
    `;
    return queryBuilder( query )
    .then( data => ({ success: true, result : true }))
    .catch( error => ({ success: false, error : error }));
}

// 닉네임 중복 확인
exports.validateByNickname = ( nickname ) => {
    const query = `
    select id
    from users
    where nickname = '${nickname}';
    `;
    return queryBuilder( query )
    .then( data => ({ success: true, result : data.rowCount !== 0 ? false : true }))
    .catch( error => ({ success: false, error : error }));
}

// 닉네임 중복 확인
exports.validateByEmail = ( email ) => {
    const query = `
    select id
    from users
    where email = '${ email }';
    `;
    return queryBuilder( query )
    .then( data => ({ success: true, result : data.rowCount !== 0 ? false : true }))
    .catch( error => ({ success: false, error : error }));
}


// 회원 아이디로 image 여부확인
exports.validateImageById = ( userId ) => {
    const query = `
    select ui.id
    from users as u
    left outer join user_images as ui
    on u.id = ui.user_id
    where u.id = '${userId}';
    `;
    return queryBuilder( query )
    .then( data => ({ success: true, result : true }))
    .catch( error => ({ success: false, error : error }));
}

// 이메일 값으로 id 찾기 ( 미사용 )
exports.findIdByEmail = ( email ) => {
    const query = `
    select id
    from users
    where email = '${email}';
    `;
    return queryBuilder( query )
    .then( data => ({ success: true, result : data.rows[0].id }))
    .catch( error => ({ success: false, error : error }));
}



// 회원 상세정보
exports.show = ( userId ) => {
    const query = `
    select ui.image_path, u.nickname, ud.age_group_type, ud.baby_gender, ud.baby_birthday
    from users as u
    left outer join user_details as ud
    on u.id = ud.user_id
    left outer join user_images as ui
    on u.id = ui.user_id
    where u.id = ${userId}
    and u.is_deleted = false
    order by  ui.created_at desc
    limit 1 offset 0;
    `;
    return queryBuilder( query )
    .then( data => ({ success: true, result : data.rows[0] }))
    .catch( error => ({ success: false, error : error }));
}

// 회원 탈퇴 ( is_delete 컬럼만 true 로 업데이트 )
// 실제 삭제는 관리자홈페이지에서 휴지통에서 삭제하도록 구현하기
exports.deleteStepOne = ( userId ) => {
    const query = `
    update users
    set is_deleted = true
    where id = ${userId};
    `;
    return queryBuilder( query )
    .then( data => ({ success: true, result : true }))
    .catch( error => ({ success: false, error : error }));
}


