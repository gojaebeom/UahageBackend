"use strict";
const { queryBuilder } = require("../../../configs/database");
const { infoLog } = require("../../../utils/log");

// 북마크 관계 확인 : 있다면 id 리턴
exports.validateBookmark = ( userId, placeId ) => {
    const query = `
    select id from p_restaurant_bookmarks
    where user_id = ${userId} and restaurant_id = ${placeId};
    `;
    return queryBuilder( query )
    .then( data => ({ success: true, result : data.rowCount !== 0 ? data.rows[0] : 0 }))
    .catch( error => ({ success: false, error : error }));
}

// 북마크 관계 생성
exports.storeBookmark = ( userId, placeId ) => {
    const query = `
    insert into p_restaurant_bookmarks(user_id , restaurant_id)
    values (${userId}, ${placeId});
    `;
    return queryBuilder( query )
    .then( data => ({ success: true, result : true }))
    .catch( error => ({ success: false, error : error }));
}

// 북마크 관계 제거
exports.deleteBookmark = ( bookmarkId ) => {
    const query = `
    delete from p_restaurant_bookmarks
    where id = ${bookmarkId}
    `;
    return queryBuilder( query )
    .then( data => ({ success: true, result : true }))
    .catch( error => ({ success: false, error : error }));
}
// 모든 장소 보기
// 검색 조건에 따라
// 북마크한 장소들 보기
// 시설 정보 조건에 맞는 장소 보기
exports.findAll =  ({
    lat, 
    lon, 
    userId, 
    babyBed,
    babyChair,
    babyMenu,
    babyTableware,
    stroller,
    diaperChange,
    meetingRoom,
    nursingRoom,
    playRoom,
    parking,
    isBookmarked,
    pageNumber,
}) => {
    console.log("모든장소보기");
    const query = `
    select
        pr.id,
        pr.name,
        pr.address,
        pr.phone,
        pr.lat,
        pr.lon,
        prf.baby_bed,
        prf.baby_chair,
        prf.baby_menu,
        prf.baby_tableware,
        prf.stroller,
        prf.diaper_change,
        prf.meeting_room,
        prf.nursing_room,
        prf.play_room,
        prf.parking,
        coalesce(prb.id, 0) as bookmark
    from p_restaurants as pr
    left outer join p_restaurant_facilities prf
    on pr.id = prf.restaurant_id
    ${ userId ? 'left outer join p_restaurant_bookmarks prb on pr.id = prb.restaurant_id ': '' }
    where
        ${ isBookmarked ? ' and prb.user_id = ' + userId : '' }
        ${ babyBed ? ' and prf.baby_bed = true' : '' }
        ${ babyChair ? ' and prf.baby_chair = true' : '' }
        ${ babyMenu ? ' and prf.baby_menu = true': '' }
        ${ babyTableware ? ' and prf.baby_tableware = true': '' }
        ${ stroller ? ' and prf.stroller = true': '' }
        ${ diaperChange ? ' and prf.diaper_change = true': '' }
        ${ meetingRoom ? ' and prf.meeting_room = true': '' }
        ${ nursingRoom ? ' and prf.nursing_room = true' : ''}
        ${ playRoom ? ' and prf.play_room = true': '' }
        ${ parking ? ' and prf.parking = true': ''};
        
    `;
    console.log(query);
    return queryBuilder( query )
    .then( data => ({ success: true, result : { total : data.rowCount, data : data.rows} }))
    .catch( error => ({ success: false, error : error }));
}

// 모든 장소 보기(10개 씩)
// 검색 조건에 따라
// 북마크한 장소들 보기
// 시설 정보 조건에 맞는 장소 보기
exports.findByOptions = ({
    lat, 
    lon, 
    userId, 
    babyBed,
    babyChair,
    babyMenu,
    babyTableware,
    stroller,
    diaperChange,
    meetingRoom,
    nursingRoom,
    playRoom,
    parking,
    isBookmarked,
    pageNumber,
}) => {
    const query = `
    select
        pr.id,
        pr.name,
        pr.address,
        pr.phone,
        pr.lat,
        pr.lon,
        prf.baby_bed,
        prf.baby_chair,
        prf.baby_menu,
        prf.baby_tableware,
        prf.stroller,
        prf.diaper_change,
        prf.meeting_room,
        prf.nursing_room,
        prf.play_room,
        prf.parking,
        coalesce(prb.id, 0) as bookmark
    from p_restaurants as pr
    left outer join p_restaurant_facilities prf
    on pr.id = prf.restaurant_id
    ${ userId ? 'left outer join p_restaurant_bookmarks prb on pr.id = prb.restaurant_id ': '' }
    where
        ${ isBookmarked ? ' and prb.user_id = ' + userId : '' }
        ${ babyBed ? ' and prf.baby_bed = true' : '' }
        ${ babyChair ? ' and prf.baby_chair = true' : '' }
        ${ babyMenu ? ' and prf.baby_menu = true': '' }
        ${ babyTableware ? ' and prf.baby_tableware = true': '' }
        ${ stroller ? ' and prf.stroller = true': '' }
        ${ diaperChange ? ' and prf.diaper_change = true': '' }
        ${ meetingRoom ? ' and prf.meeting_room = true': '' }
        ${ nursingRoom ? ' and prf.nursing_room = true' : ''}
        ${ playRoom ? ' and prf.play_room = true': '' }
        ${ parking ? ' and prf.parking = true': ''}
        order by  ST_DistanceSphere(geom, ST_MakePoint(${lon},${lat}))
        limit 10 offset ${pageNumber};
        ;
    `;

    console.log(query);
    return queryBuilder( query )
    .then( data => ({ success: true, result : { total : data.rowCount, data : data.rows} }))
    .catch( error => ({ success: false, error : error }));
}

// 장소 상세보기
exports.show = ( placeId ) => {
    const query = `
    select
        pr.id,
        pr.name,
        pr.address,
        pr.phone,
        pr.lat,
        pr.lon,
        prf.baby_bed,
        prf.baby_chair,
        prf.baby_menu,
        prf.baby_tableware,
        prf.stroller,
        prf.diaper_change,
        prf.meeting_room,
        prf.nursing_room,
        prf.play_room,
        prf.parking
    from p_restaurants as pr
    left outer join p_restaurant_facilities prf
    on pr.id = prf.restaurant_id
    where
        pr.id = ${ placeId };
    `;
    return queryBuilder( query )
    .then( data => ({ success: true, result : data.rows }))
    .catch( error => ({ success: false, error : error }));
}

// 리뷰 리스트 보기
exports.findReview = ( placeId ) => {
    const query = `
    select
        prr.id,
        prr.restaurant_id,
        prr.user_id,
        prr.description,
        prr.total_rating,
        prr.taste_rating,
        prr.cost_rating,
        prr.service_rating,
        STRING_AGG(prri.image_path , ',' ) as image_path
    from p_restaurant_reviews as prr
    left join p_restaurant_review_images as prri
    on prr.id = prri.review_id
    where prr.restaurant_id = ${ placeId }
    group by prr.id;
    `;
    infoLog(`=== Query ===\n${query}\n=== End Query ===`);
    return queryBuilder( query )
    .then( data => ({ success: true, result : data.rows }))
    .catch( error => ({ success: false, error : error }));
}


// 리뷰 저장
exports.storeReview = ({
    images,
    userId, 
    placeId,
    desc,
    totalRating,
    tasteRating,
    costRating,
    serviceRating
}) => {

    const query = `
    with reviews as (
        insert into p_restaurant_reviews(
            user_id,
            restaurant_id,
            description,
            total_rating,
            taste_rating,
            cost_rating,
            service_rating
        )
        values ( 
            ${userId}, 
            ${placeId}, 
            '${desc}', 
            ${totalRating}, 
            ${tasteRating}, 
            ${costRating}, 
            ${serviceRating}
        )
        returning id
    )
    insert into p_restaurant_review_images( review_id, image_path )
    values
    ${ images.map((item)=>{
        return "( (select id from reviews), '"+ item.location +"')"
    })};
    `; 
    console.log(` ======  query  ======\n${query}\n ====== end query ======`);
    return queryBuilder( query )
    .then( data => ({ success: true, result : true }))
    .catch( error => ({ success: false, error : error }));
}

// 리뷰 삭제 
exports.deleteReviewStepOne = ( reviewId ) => {
    const query = `
    delete from p_restaurant_reviews
    where id = ${ reviewId }
    `;
    infoLog(`=== Query ===\nquery\n=== End Query ===`);

    return queryBuilder( query )
    .then( data => ({ success: true, result : true }))
    .catch( error => ({ success: false, error : error }));
}