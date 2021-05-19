"use strict";
const { queryBuilder } = require("../../../configs/database");

// 모든 장소 보기
exports.findByOptions = () => {
    const query = `
    select id, name, address, phone, examination_items, lat, lon
    from p_hospitals;
    `;

    console.log(query);
    return queryBuilder( query )
    .then( data => ({ success: true, result : { total : data.rowCount, data : data.rows} }))
    .catch( error => ({ success: false, error : error }));
}

// 장소 상세보기
exports.show = ( placeId ) => {
    const query = `
    select id, name, address, phone, examination_items, lat, lon
    from p_hospitals
    where id = ${placeId};
    `;
    return queryBuilder( query )
    .then( data => ({ success: true, result : data.rows }))
    .catch( error => ({ success: false, error : error }));
}
