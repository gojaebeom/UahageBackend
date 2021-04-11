"use strict"

const { findAll , findOne, updateAll, store, findByOptions, updateByOptions, destroy } = require("./user.repository");

exports.index = async ( req, res ) => {
    const { success, message, data, error } = await findAll();
    success === true ? 
    res.status(200).json({ message: message , data : data}) : 
    res.status(500).json({ message: message , error : error });
}

exports.findByOptions = async ( req, res ) => {
    const querystring = req.query;
    console.log(querystring);

    const { success , message, data, error } = await findByOptions( querystring );
    success === true ? 
    res.status(200).json({ message: message , data : data }) : 
    res.status(500).json({ message: message , error : error });
}

exports.show = async ( req, res ) => {
    const id = req.params.id;
    const { success , message, data, error } = await findOne( id );
    success === true ? 
    res.status(200).json({ message: message , data : data}) : 
    res.status(500).json({ message: message , error : error });
}

exports.create = async ( req, res ) => {
    const body = req.body;
    const { success , message, data, error } = await store( body );
    success === true ? 
    res.status(200).json({ message: message , data : data}) : 
    res.status(500).json({ message: message , error : error });
}

exports.update = async ( req, res ) => {

    /** 
    * @README 💡
    ------------------------------------------------------------------
    기존에 client에서 nickname을 받아오는 부분을 id로 받아올 수 있을까요?
    nickname column도 유니크 속성이지만, primary key로 받아올 수 있다면 더 괜찮을 것 같습니다.
    url name이 `PUT /updateNicknames/:nickname` 이였지만 , 
    PUT type이 update를 의미하기 때문에, url에 행위를 나타내는 update 표현을 제거하였습니다.
    내용은 전체 속성을 수정하는 것으로 보여 -> `PUT /users/:nickname` 으로 수정하였습니다. 
    ( id 를 param으로 가져오는 로직으로 바뀐다면 url name을 '/users/:id' 로 교체하는 등 sql 내용도 달라지게 되니, 상의를 해보는 것이 좋을것 같습니다. )
    ------------------------------------------------------------------*/
    const nickname = req.params.nickname;
    const body = req.body;
    console.log(`
        nickname : ${nickname}
        gender   : ${body.gender}
        baby birthday : ${body.birthday}
        parent age      : ${body.age}
        userId   : ${body.userId}
    `);

    const { success , message, data, error } = await updateAll( nickname,  body );
    
    success === true ? 
    res.status(200).json({ message: message , data : data }) : 
    res.status(500).json({ message: message , error : error });
}

exports.updateByOptions = async ( req, res ) => {
    const id = req.params.id;
    const body = req.body;

    //id, email 은 수정금지
    if(  body.id || body.email ) return res.status(403).json({ message: "is not allowed"  });

    const { success , message, data, error } = await updateByOptions( id,  body );
    
    success === true ? 
    res.status(200).json({ message: message , data : data }) : 
    res.status(500).json({ message: message , error : error });
}

exports._delete = async ( req, res ) => {
    const id = req.params.id;

    const { success , message, data, error } = await destroy( id );
    
    success === true ? 
    res.status(200).json({ message: message , data : data }) : 
    res.status(500).json({ message: message , error : error });
}

