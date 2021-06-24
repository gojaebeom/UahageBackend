"use strict";
import * as repository from "../../repository/user/User.repo";
import { createToken } from "../../../util/jwt";
import log from "../../../config/Logger";
import { getSlangList } from "../../../util/slangList";


export const oAuthLogin = async (email: any, body: any) => {
    //? 이메일로 저장된 유저 아이디 확인 : 있으면 유저 아이디 반환, 없으면 0 반환
    let repoObject: any = await repository.findIdByEmail(email);
    if (!repoObject.success) return repoObject;

    //? 이메일이 저장되지 않은 유저는 회원 정보 저장
    if (repoObject.result === 0) {
        // store!
        const { nickname, ageGroupType, babyGender, babyBirthday } = body;
        repoObject = await repository.store(
            email,
            nickname,
            ageGroupType,
            babyGender,
            babyBirthday
        );
        if (!repoObject.success) return repoObject;

        repoObject = await repository.findIdByEmail(email);
        if (!repoObject.success) return repoObject;
    }

    //? 이후 토큰 발급
    const userId = repoObject.result.id;
    const jwtToken = createToken(userId);

    log.info(jwtToken);

    return { success: true, message: repoObject.message, result: { token: jwtToken } };
}


// 회원 상세정보
export const findOne = async (userId: any) => await repository.findOne(userId);


// 회원 닉네임
export const findNickname = async (userId: any) => await repository.findNickname(userId);



export const update = async (userId: any, body: any) => {
    const { nickname, ageGroupType, babyGender, babyBirthday } = body;
    return await repository.edit(userId, nickname, ageGroupType, babyGender, babyBirthday);
}


// 닉네임 중복채크
export const validateByNickname = async (nickname: string) => {

    // 닉네임 정규식
    if (!/^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}$/.test(nickname)){
        return {success: true, message: "닉네임은 한글, 영문, 숫자만 가능하며 2-10자리로 입력해주세요.", result: { code : 0, isSuccess: false }};
    }

    // 비속어 필터링
    const slangList: Array<string> = getSlangList();
    for(let i: number = 0; i < slangList.length; i++) {
        if( nickname.includes(slangList[i]) )
            return {success: true, message: "비속어를 포함할 수 없습니다.", result: { code : -1, isSuccess: false }};
    }

    return await repository.validateByNickname(nickname);
};


// 이메일 중복채크
export const validateByEmail = async (email: any) => await repository.validateByEmail(email);


// 회원 탈퇴 
export const _delete = async (userId: any) => await repository.deleteStepOne(userId);
