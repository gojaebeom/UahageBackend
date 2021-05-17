"use strict"
import { findAll , findOne, updateAll, store, findByOption as RfindByOption, updateByOptions as RupdateByOptions, destroy } from "./user.repository.js";

async function index( req, res ){
    const querystring = req.query;

    console.log( querystring.length );
    console.log( querystring );

    const { success, message, data, error } = await findAll();
    success === true ? 
    res.status(200).json({ message: message , data : data}) : 
    res.status(500).json({ message: message , error : error });
}

// 하나의 조건으로 정보 찾을 때 사용 🥕
async function findByOption( req, res ){
    console.log("findbyoption");
    const {option , optionData} = req.query;
    const { success , message, data, error , isdata } = await RfindByOption( option , optionData );
    success === true ? 
    res.status(200).json({ message: message , data : data , isdata: isdata }) : 
    res.status(500).json({ message: message , error : error    });
}

async function show( req, res ){
    const id = req.params.id;
    const { success , message, data, error } = await findOne( id );
    success === true ? 
    res.status(200).json({ message: message , data : data}) : 
    res.status(500).json({ message: message , error : error });
}

async function create( req, res ){
    const body = req.body;
    console.log(body);
    const { success , message, data, error } = await store( body );
    success === true ? 
    res.status(200).json({ message: message , data : data}) : 
    res.status(500).json({ message: message , error : error });
}

async function update( req, res ){
    const id = Number(req.params.id);
    const body = req.body;
    console.log(`
        id: ${id}
        nickname : ${body.nickname}
        gender   : ${body.gender}
        baby birthday : ${body.birthday}
        parent age      : ${body.age}
        profile_url: ${body.profile_url}
        rf_token:     ${body.rf_token}
    `);
    console.log(body);
    const { success , message, data, error } = await updateAll( id,  body );
    success === true ? 
    res.status(200).json({ message: message , data : data }) : 
    res.status(500).json({ message: message , error : error });
}

async function updateByOptions( req, res ){
    const id = req.params.id;
    const body = req.body;
    //id, email 은 수정금지
    if( body.id || body.email) return res.status(403).json({ message: "is not allowed"  });
    const { success , message, data, error } = await RupdateByOptions( id,  body );
    success === true ? 
    res.status(200).json({ message: message , data : data }) : 
    res.status(500).json({ message: message , error : error });
}


async function _delete( req, res ){
    const id = req.params.id;
    console.log(id);
    const { success , message, data, error } = await destroy( id );
    
    success === true ? 
    res.status(200).json({ message: message , data : data }) : 
    res.status(500).json({ message: message , error : error });
}

export default { index, show, findByOption, create, update, updateByOptions,_delete };

