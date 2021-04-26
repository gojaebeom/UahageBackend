"use strict"

import {
    comparePassword,
    encryptedPassowrd
} from "../../utils/bcrypt.js";
import {
    createToken
} from "../../utils/jwt.js";
import {
    findByOption , store
} from "../user/user.repository.js"


//로그인
export async function signin(req, res) {

    // 이메일이 존재하는지 검사
    let resultObject = await findByOption("email" , email);
    
    // query error 
    if (!resultObject.success)
        return res.status(500).json({
            message: "sign-up false",
            data: resultObject.result
        });
    // 회원가입이 되어있는경우 
    if (resultObject.isdata != 0){
        const token = createToken(userData.data.id);
        res.status(200).json({
            message: "user token ok",
            data: {
                result: resultObject.result,
                token: token,
                id: userData.data.id
            }
        });
    }else{
        res.status(200).json({
            message: "user not"
        })
    }
    

    


}


//회원가입
export async function signup(req, res) {
    console.log("sign up");
    const {
        email,
        nickname,
        gender,
        birthday,
        age,
        URL,
        rf_token
    } = req.body;
    // 이메일이 존재하는지 검사
    let resultObject = await findByOption("email" , email);
    
    // query error 
    if (!resultObject.success)
        return res.status(500).json({
            message: "sign-up false",
            data: resultObject.result
        });
    // 이메일이 존재하는데 회원가입을 시도한 경우
    if (resultObject.isdata != 0)
        return res.status(400).json({
            message: "email duplicated",
            data: false
        });

    console.log(resultObject.message);

    // 회원정보 저장
    resultObject = await store(req.body);
    console.log(resultObject);
    

    if (!resultObject.success) {
        // 회원정보 저장 실패
        res.status(500).json({
            message: "user store false",
            data: resultObject.result,
        })
    } else {
        // 회원정보 저장 성공 & 토큰 생성
        const userData = await findByOption("email" , email);
        console.log( userData.data.id);
        
        const token = createToken(userData.data.id)
        res.status(200).json({
            message: "user stored",
            data: {
                result: resultObject.result,
                token: token,
                id: userData.data.id
            }
        });
    }

}
