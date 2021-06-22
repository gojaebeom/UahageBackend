import { Request, Response, Router } from "express";
import * as json from "../util/data.json";
import { queryBuilder } from "../config/Database";

const router: Router = Router();


router.post("/api/places/craft-rooms/all", async ( req, res ) => {


    const craftRoomList: any = json.Sheet1;
    

    const query = `
    insert into p_craft_rooms( name, address, phone, worked_at, store_info, url )
    values
    ${ craftRoomList.map(( item: any ) => {
        return "( '"+ item["이름"] + "', '"+ item["장소"] +"', '"+ item["전화번호"] +"', '"+ item["영업시간"] +"', '"+ item["매장정보"] +"', '"+ item["홈페이지 주소"] +"')";
    })}`;

    console.log( query );

    const result = await queryBuilder(query, null)
                            .then( (data: any) => data.rows)
                            .catch( err => err);

    res.json({
        "result" : result
    });
});

export default router;