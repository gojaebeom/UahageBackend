"use strict"

import {
    comparePassword,
    encryptedPassowrd
} from "../../utils/bcrypt.js";
import {
    createToken
} from "../../utils/jwt.js";
import {
    findLoginInfo,
    store
} from "./auth.repository.js";

//login user
export async function signin(req, res) {
    const {
        email,
        password
    } = req.body;
    // no need password
    console.log(email, password);
    // find id, email, password from email
    const {
        success,
        result
    } = await findLoginInfo(email);

    // query error
    if (!success)
        return res.status(500).json({
            message: "login false",
            data: result
        });
    // not found email
    if (!result)
        return res.status(400).json({
            message: "not found email",
            data: false
        });

    // not matched password
    const isMatched = comparePassword(password, result[0].password);
    if (!isMatched)
        return res.status(400).json({
            message: "not matched password",
            data: false
        });

    // 위의 유효성 검사들을 통과하면 토큰 발급 ( 토큰에는 유저의 id와 roles 가 들어감 )
    const {
        id,
        roles
    } = result[0];
    console.log(id);
    const token = createToken(id);
    console.log(token);
    res.status(200).json({
        message: "login success",
        data: token
    });
}

//create user
export async function signup(req, res) {
    const {
        email,
        nickname,
        gender,
        birthday,
        age,
        URL,
        rf_token
    } = req.body;
    // find id, email, password from email
    console.log(req.body);
    let resultObject = await findLoginInfo(email);
    
    // query error 
    if (!resultObject.success)
        return res.status(500).json({
            message: "sign-up false",
            data: resultObject.result
        });
    // not found email
    if (resultObject.result)
        return res.status(400).json({
            message: "email duplicated",
            data: false
        });
    console.log(resultObject.result);


    // 비밀번호 암호화
    // const hsPassword = await encryptedPassowrd(password);
    // const token = createToken(id);
    // 회원 저장
    resultObject = await store(email, nickname, gender, birthday, age, URL);
    // create token : need id

    //const { id } = resultObject.result[0];
    if (!resultObject.success) {

        res.status(500).json({
            message: "user store false",
            data: resultObject.result,
        })
    } else {
        const {
            success,
            result
        } = await findLoginInfo(email);
        console.log("result " + JSON.stringify(result));
        const token = createToken(result[0].id)
        res.status(200).json({
            message: "user stored",
            data: {
                result: resultObject.result,
                token: token,
                id: result[0].id
            }
        });
    }

}

export async function check(req, res) {
    const {
        userId,
        nickname
    } = req.body;
    let resultObject = userId === undefined ?
        await findLoginInfo(userId, nickname) :
        await findLoginInfo(userId, nickname);
    return resultObject.success ? res.status(200).json({
            message: "get results",
            data: resultObject.result
        }) :
        res.status(500).json({
            message: "Could not find",
            console: resultObject.result
        });

}