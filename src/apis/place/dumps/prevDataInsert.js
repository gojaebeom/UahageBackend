import { Router } from "express";
import { query } from "../../../config/database.js";

/**
 * 장소 종류 코드 >  
 * 1:카페,음식점 / 2:병원 / 3:어린이집 / 4:유치원 / 5:키즈카페 / 6:체험관 / 7:유원지 / 8:장난감도서관 / 9:보육센터
 */
const router = Router( );
router.post("/restaurants", async (req, res)=> {
    const data = await import("./json/restaurants.json");
    
    for(let item of data.default) {
        console.log(item);
        const place_code = 1;
        let { store_name, address, phone, lat, lon, carriage, bed, 
            tableware, nursingroom, meetingroom, diapers, playroom, chair, menu } = item;
        
        carriage = carriage === "○" ? 1 : 0;
        bed = bed === "○" ? 1 : 0;
        tableware = tableware === "○" ? 1 : 0;
        nursingroom = nursingroom === "○" ? 1 : 0;
        meetingroom = meetingroom === "○" ? 1 : 0;
        diapers = diapers === "○" ? 1 : 0;
        playroom = playroom === "○" ? 1 : 0;
        chair = chair === "○" ? 1 : 0;
        menu = menu === "○" ? 1 : 0;
        let _query = `
        insert into 
        places( place_code, name, address, phone, lat, lon, add_info )
        values( 
            ${place_code}, '${store_name}', '${address}', '${phone}', '${lon}', '${lat}', 
            '{
                "carriage":"${carriage}",
                "bed":"${bed}",
                "tableware":"${tableware}",
                "nursingroom":"${nursingroom}",
                "meetingroom":"${meetingroom}",
                "diapers":"${diapers}",
                "playroom":"${playroom}",
                "chair":"${chair}",
                "menu":"${menu}"
            }'
        );`;
        query(_query).then( data => console.log(data))
            .catch( err => console.log(err));
    }

    res.json({ result : "ok" });
});

router.post("/restaurants-v2", async (req, res) => {
    const data = await import("./json/restaurants_v2.json");
    
    let i = 0;
    for(let item of data.default['Sheet1']) {
        console.log(item);
        let { category_id, name, address, phone, lat, lon, baby_menu, baby_bed, 
            baby_tableware, baby_chair, diaper_change, stroller, meeting_room, play_room, nursing_room } = item;
        
        if( lat && lon  ){
            i += 1;
            console.log(i);
            let _query = `
            WITH rtrt AS (
                insert into p_restaurants(category_id, name, address, phone, lat, lon)
                values(${category_id}, '${name}', '${address}', '${phone}', '${lat}', '${lon}')
                RETURNING id
            ),
            rtrt_fac(bm,bb,bt,bc, d, s, mr, pr, nr, p) AS (
                values
                (
                    ${baby_menu ? true : false},
                    ${baby_bed ? true : false},
                    ${baby_tableware ? true : false},
                    ${baby_chair ? true : false},
                    ${diaper_change ? true : false},
                    ${stroller ? true : false},
                    ${meeting_room ? true : false},
                    ${play_room ? true : false},
                    ${nursing_room ? true : false},
                    ${false}
                )
            )
            INSERT INTO p_restaurant_facilities(restaurant_id, baby_menu, baby_bed, baby_tableware, baby_chair, diaper_change, stroller, meeting_room, play_room, nursing_room, parking)
                SELECT rtrt.id, rtrt_fac.bm, rtrt_fac.bb, rtrt_fac.bt, rtrt_fac.bc, rtrt_fac.d, rtrt_fac.s, rtrt_fac.mr, rtrt_fac.pr, rtrt_fac.nr, rtrt_fac.p FROM rtrt_fac, rtrt;
            `;
            query(_query).then( data => console.log(data))
            .catch( err => console.log(err));
        }
    }

    res.json({ result : "ok" });
});

// 병원 데이터 import
router.post("/hospitals", async (req, res) => {
    const data = await import("./json/hospitals.json");
    for(let item of data.default) {
        console.log(item);
        let { store_name, address, phone, lat, lon, Examination_item } = item;

        let _query = `
        insert into
        p_hospitals(name, address, phone, lat, lon, examination_items )
        values('${store_name}', '${address}', '${phone}', '${lon}', '${lat}', '${Examination_item}');`;
        query(_query).then( data => console.log(data))
            .catch( err => console.log(err));
    }
    res.json({"result":"ok"});
});

// 키즈카페 데이터 import
router.post("/kid-cafes", async (req, res) => {
    const data = await import("./json/kid_cafes.json");
    
    for(let item of data.default) {
        console.log(item);
        let { store_name, address, phone, lat, lon, fare } = item;

        let _query = `
        insert into 
        p_kid_cafes(  name, address, phone, lat, lon, admission_fee )
        values( '${store_name}', '${address}', '${phone}', '${lon}', '${lat}', '${fare}');`;
        query(_query).then( data => console.log(data))
            .catch( err => console.log(err));
    }
    res.json({"result":"ok"});
});

// 체험관 import
router.post("/experience-centers", async (req, res) => {
    const data = await import("./json/experience_centers.json");
    
    for(let item of data.default) {
        console.log(item);
        let { store_name, address, phone, lat, lon, fare } = item;

        let _query = `
        insert into 
        p_experience_centers( name, address, phone, lat, lon, admission_fee )
        values('${store_name}', '${address}', '${phone}', '${lon}', '${lat}', '${fare}');`;
        query(_query).then( data => console.log(data))
            .catch( err => console.log(err));
    }
    res.json({"result":"ok"});
});

// 어린이집 import
router.post("/day-care-centers", async (req, res) => {
    const data = await import("./json/day_care_centers.json");
    
    for(let item of data.default) {
        console.log(item);
        let { name, address, phone, lat, lon, bus, type, members, rooms} = item;

        let _query = `
        insert into 
        p_day_care_centers( name, address, phone, lat, lon, type, use_bus, employees, rooms )
        values('${name}', '${address}', '${phone}', '${lat}', '${lon}', '${type}', '${bus === "운영" ? true : false}', '${members}', '${rooms}');`;
        query(_query).then( data => console.log(data))
            .catch( err => console.log(err));
    }
    res.json({"result":"ok"});
});
export default router;