"use strict";
const { queryBuilder } = require("../../../config/Database");


exports.infoUpdatePropose = ( body ) => {
    const query = `
    insert into p_info_propose(user_id, place_category_id, place_id, description)
    values(${body.userId}, ${body.placeCategoryId}, ${body.placeId}, '${body.desc}')`;
    return queryBuilder( query )
    .then( data => ({ success: true, message: "Store PlaceInfoPropose success",  result : true}))
    .catch( error => ({ success: false, message: "Store PlaceInfoPropose false", error : error }));
}


exports.infoUpdateProposeWithImages = ( body, images ) => {
    const query = `
    with pipp as(
        insert into p_info_propose(user_id, place_category_id, place_id, description)
        values (${body.userId}, ${body.placeCategoryId}, ${body.placeId}, '${body.desc}')
        returning id
    )
    insert into p_info_propose_images( p_info_id, image_path )
    values
    ${ images.map( item => {
        return "((select id from pipp), '"+item.location+"')";
    })}`;
    return queryBuilder( query )
    .then( data => ({ success: true, message: "Store PlaceInfoPropose success",  result : true }))
    .catch( error => ({ success: false, message: "Store PlaceInfoPropose false", error : error }));
}