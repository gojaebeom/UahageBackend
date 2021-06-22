import { queryBuilder } from "../../../config/Database";
import log from "../../../config/Logger";


// 모든 장소 보기
export const findAll = () => {
    const query = `
    select
    pcr.id, pcr.name, pcr.address, pcr.phone, pcr.url, pcr.worked_at, pcr.store_info, pcr.lat, pcr.lon, STRING_AGG(pcri.image_path , ',' ) as image_path
    from p_craft_rooms as pcr
    left join p_craft_room_images as pcri
    on pcr.id = pcri.place_id
    group by pcr.id;`;

    log.info(query);
    return queryBuilder(query, null)
        .then((data: any) => ({ success: true, message: "Get DayCareCenter list success", result: { total: data.rowCount, data: data.rows } }))
        .catch(error => ({ success: false, message: "Get DayCareCenter list false", error: error }));
}

// 모든 장소 보기(10개 씩)
export const findByOptions = (pageNumber: any, lat: any, lon: any) => {
    const query = `
    select
    pcr.id, pcr.name, pcr.address, pcr.phone, pcr.url, pcr.worked_at, pcr.store_info, pcr.lat, pcr.lon, STRING_AGG(pcri.image_path , ',' ) as image_path
    from p_craft_rooms as pcr
    left join p_craft_room_images as pcri
    on pcr.id = pcri.place_id
    group by pcr.id;`;
    // order by  ST_DistanceSphere(geom, ST_MakePoint(${lon},${lat}))
    // limit 10 offset ${pageNumber};
    log.info(query);
    return queryBuilder(query, null)
        .then((data: any) => ({ success: true, message: "Get DayCareCenter list success", result: { total: data.rowCount, data: data.rows } }))
        .catch(error => ({ success: false, message: "Get DayCareCenter list false", error: error }));
}

// 장소 상세보기
export const findOne = (placeId: any) => {
    const query = `
    select
    pcr.id, pcr.name, pcr.address, pcr.phone, pcr.url, pcr.worked_at, pcr.store_info, pcr.lat, pcr.lon, STRING_AGG(pcri.image_path , ',' ) as image_path
    from p_craft_rooms as pcr
    left join p_craft_room_images as pcri
    on pcr.id = pcri.place_id
    where pcr.id = ${placeId}
    group by pcr.id;
    `;
    return queryBuilder(query, null)
        .then((data: any) => ({ success: true, message: "Get DayCareCenter detail success", result: data.rows }))
        .catch(error => ({ success: false, message: "Get DayCareCenter detail false", error: error }));
}
