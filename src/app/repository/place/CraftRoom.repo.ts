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
        .then((data: any) => {
            let rows = data.rows;
            console.log(rows.length);

            for(let i:number = 0; i < rows.length; i++ ) {
                // ImagePath Next
                const imagePath = data.rows[i].image_path;
                if(imagePath !== null){
                    const imagePathArray = imagePath.split(",");
                        // ImagePath Prev
                data.rows[i].image_path = imagePathArray;
                }
            }

            return { success: true, message: "Get DayCareCenter list success", result: { total: data.rowCount, data: data.rows } };
        })
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
        .then((data: any) => {
            let rows = data.rows;
            console.log(rows.length);

            for(let i:number = 0; i < rows.length; i++ ) {
                // ImagePath Next
                const imagePath = data.rows[i].image_path;
                if(imagePath !== null){
                    const imagePathArray = imagePath.split(",");
                           // ImagePath Prev
                data.rows[i].image_path = imagePathArray;
                }
            }

            return { success: true, message: "Get DayCareCenter list success", result: { total: data.rowCount, data: data.rows } };
        })
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
        .then((data: any) => {
            const imagePath = data.rows[0].image_path;
            const imagePathArray = imagePath.split(",");
            
            data.rows[0].image_path = imagePathArray;

            // console.log(data.rows[0].image_path);
            
            return { success: true, message: "Get DayCareCenter detail success", result: data.rows };
        })
        .catch(error => ({ success: false, message: "Get DayCareCenter detail false", error: error }));
}
