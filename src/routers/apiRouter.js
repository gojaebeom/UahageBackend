"use strict";
/**@ImportControllers 🍅 */
const userController = require("../apis/user/userController");
const placeRestaurantController = require("../apis/places/restaurant/placeController");
const placeDayCareCenterController = require("../apis/places/dayCareCenter/placeController");
const placeHospitalController = require("../apis/places/hospital/placeController");
const placeExperienceCenterController = require("../apis/places/experienceCenter/placeController");
const placeKidCafeController = require("../apis/places/kidCafe/placeController");

/**@ImportMiddlewares 🍇 */
const { auth } = require("../middlewares/authMiddleware");
const { s3 } = require("../middlewares/s3Middleware");
const passport = require("../configs/kakao");

const { Router } = require("express");
const router = Router();
const axios = require("axios");

/**@APIs 🍬*/
// User Api
// 🍩 카카오 로그인 ( 결과적으로 jwt 토큰 반환 , 기존에 계정 없으면 회원가입진행 이후 반환 )
router.post('/api/users', userController.store);
// 회원 상세 정보
router.get("/api/users/:id", auth, userController.show);
// 회원 닉네임 확인 ( 있으면 false, 없으면 true )
router.get("/api/users/validate-nickname/:nickname", auth, userController.validateByNickname);
// 회원 이메일 확인
router.get("/api/users/validate-email/:email", auth, userController.validateByEmail);
// 회원 수정 ( 첫 회원가입 이후 추가정보 입력에도 사용 )  
router.put("/api/users/:id", s3, userController.edit);
// 회원 로그아웃
router.get("/api/users/logout", auth, userController.logout);
// 회원 탈퇴
router.delete("/api/users/:id", auth, userController.delete);

// Place-restaurant Api
router.post("/api/places/restaurants/bookmarks", placeRestaurantController.bookmarkToogle);
router.get("/api/places/restaurants", placeRestaurantController.findByOptions);
router.get("/api/places/restaurants/:id", placeRestaurantController.show);
// Place-dayCareCenter
router.get("/api/places/day-care-centers", placeDayCareCenterController.findByOptions);
router.get("/api/places/day-care-centers/:id", placeDayCareCenterController.show);
// Place-hospital
router.get("/api/places/hospitals", placeHospitalController.findByOptions);
router.get("/api/places/hospitals/:id", placeHospitalController.show);
// Place-experienceCenter
router.get("/api/places/experience-centers", placeExperienceCenterController.findByOptions);
router.get("/api/places/experience-centers/:id", placeExperienceCenterController.show);
// Place-kidCafe
router.get("/api/places/kid-cafes", placeKidCafeController.findByOptions);
router.get("/api/places/kid-cafes/:id", placeKidCafeController.show);


router.get("/api/auth/kakao/login", passport.authenticate('kakao'), userController.kakaoLogin);
router.get("/api/test", async (req, res) => {
    const token = req.headers['authorization'];
    const response = await axios.get("https://kapi.kakao.com/v2/user/me",{
        headers: { 
            'Authorization': `Bearer ${token}` ,
            'Content-type' : 'application/x-www-form-urlencoded;charset=utf-8'
        },
    }).then(res => res.data);
    console.log(response);
    res.json({result: true});
});

module.exports = router;