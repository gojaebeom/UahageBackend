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

// 병원 데이터 import
router.post("/hospitals", async (req, res) => {
    const data = await import("./json/hospitals.json");
    
    for(let item of data.default) {
        console.log(item);
        const place_code = 2;
        let { store_name, address, phone, lat, lon, Examination_item } = item;

        let _query = `
        insert into 
        places( place_code, name, address, phone, lat, lon, add_info )
        values( ${place_code}, '${store_name}', '${address}', '${phone}', '${lon}', '${lat}', '{"examination":"${Examination_item}"}');`;
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
        const place_code = 4;
        let { store_name, address, phone, lat, lon, fare } = item;

        let _query = `
        insert into 
        places( place_code, name, address, phone, lat, lon, add_info )
        values( ${place_code}, '${store_name}', '${address}', '${phone}', '${lon}', '${lat}', '{"fare":"${fare}"}');`;
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
        const place_code = 5;
        let { store_name, address, phone, lat, lon, fare } = item;

        let _query = `
        insert into 
        places( place_code, name, address, phone, lat, lon, add_info )
        values( ${place_code}, '${store_name}', '${address}', '${phone}', '${lon}', '${lat}', '{"fare":"${fare}"}');`;
        query(_query).then( data => console.log(data))
            .catch( err => console.log(err));
    }
    res.json({"result":"ok"});
});



export default router;