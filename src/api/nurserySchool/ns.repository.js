const { query } = require("../../config/database")

exports.store = async ( body ) => {
    /**
     *  space_code : 3
     *  space_name : 
     *  addr : 
     *  phone : 
     *  lat : 
     *  lon : 
     *  add_info
     */
    const space_code = 3;
    let SQL = `
    insert into 
    spaces( space_code, space_name, addr, phone, lat, lon, add_info )
    values
    `;

    for(let item of body) {
        //console.log(item);
        SQL += `
        ( 
            ${space_code},'${item["어린이집명"]}','${item["주소"]}','${item["어린이집전화번호"]}','${item["위도"]}','${item["경도"]}', 
            '{
                "bus":"${item["통학차량운영여부"]}",
                "teachers": "${item["보육교직원수"]}",
                "rooms":"${item["보육실수"]}"
            }'),`;
    }

    SQL = SQL.slice(0,-1);// 마지막 문자 , 제거

    console.log(SQL);

    await query( SQL )
        .then( data => { 
            console.log( data );
            return { success : true, message : "created successfully", data : data};
        })
        .catch( err => {
            console.log( err );
            return { success : false, message : "Could not create", error : err };
        });
}