"use strict";
/**@ImportControllers 🍅 */
const userController = require("../apis/user/userController");
const placeRestaurantController = require("../apis/places/restaurant/placeController");
const placeDayCareCenterController = require("../apis/places/dayCareCenter/placeController");
const placeHospitalController = require("../apis/places/hospital/placeController");
const placeExperienceCenterController = require("../apis/places/experienceCenter/placeController");
const placeKidCafeController = require("../apis/places/kidCafe/placeController");

/**@ImportMiddlewares 🍇 */
const { defaultAuthMiddlware, userAuthMiddleware } = require("../middlewares/authMiddleware");
const { s3Middleware } = require("../middlewares/s3Middleware");

const { Router } = require("express");
const { kakaoLoginMiddleware } = require("../middlewares/kakaoLoginMiddleware");
const { naverLoginMiddleware } = require("../middlewares/naverLoginMiddleware");
const router = Router();

/**@APIs 🍬*/
// User Api
// 🍩 카카오 로그인 ( 결과적으로 jwt 토큰 반환 , 기존에 계정 없으면 회원가입진행 이후 반환 )
router.post(
    "/api/users/kakao-login", 
    kakaoLoginMiddleware, 
    userController.oAuthLogin
);
// 🍑 네이버 로그인 ( 결과적으로 jwt 토큰 반환 , 기존에 계정 없으면 회원가입진행 이후 반환 )
router.post(
    "/api/users/naver-login", 
    naverLoginMiddleware, 
    userController.oAuthLogin
);
// 회원 상세 정보
router.get(
    "/api/users/:id", 
    defaultAuthMiddlware, 
    userController.show
);
// 회원 닉네임 확인 ( 있으면 false, 없으면 true )
router.get(
    "/api/users/validate-nickname/:nickname", 
    defaultAuthMiddlware, 
    userController.validateByNickname
);
// 회원 이메일 확인
router.get(
    "/api/users/validate-email/:email", 
    defaultAuthMiddlware, 
    userController.validateByEmail
);
// 회원 수정 ( 첫 회원가입 이후 추가정보 입력에도 사용 )
router.put(
    "/api/users/:id", 
    userAuthMiddleware,
    s3Middleware, 
    userController.edit
);
// 회원 로그아웃
router.get(
    "/api/users/logout", 
    defaultAuthMiddlware, 
    userController.logout
);
// 회원 탈퇴
router.delete(
    "/api/users/:id", 
    userAuthMiddleware, 
    userController.delete
);

// Place-restaurant Api
router.post(
    "/api/places/restaurants/bookmarks", 
    defaultAuthMiddlware,
    placeRestaurantController.bookmarkToogle
);
router.get(
    "/api/places/restaurants", 
    defaultAuthMiddlware,
    placeRestaurantController.findByOptions
);
router.get(
    "/api/places/restaurants/:id", 
    defaultAuthMiddlware,
    placeRestaurantController.show
);
// Place-dayCareCenter
router.get(
    "/api/places/day-care-centers", 
    defaultAuthMiddlware,
    placeDayCareCenterController.findByOptions
);
router.get(
    "/api/places/day-care-centers/:id", 
    defaultAuthMiddlware,
    placeDayCareCenterController.show
);
// Place-hospital
router.get(
    "/api/places/hospitals", 
    defaultAuthMiddlware,
    placeHospitalController.findByOptions
);
router.get(
    "/api/places/hospitals/:id", 
    defaultAuthMiddlware,
    placeHospitalController.show);
// Place-experienceCenter
router.get(
    "/api/places/experience-centers", 
    defaultAuthMiddlware,
    placeExperienceCenterController.findByOptions
);
router.get(
    "/api/places/experience-centers/:id", 
    defaultAuthMiddlware,
    placeExperienceCenterController.show
);
// Place-kidCafe
router.get(
    "/api/places/kid-cafes", 
    defaultAuthMiddlware,
    placeKidCafeController.findByOptions
);
router.get(
    "/api/places/kid-cafes/:id", 
    defaultAuthMiddlware,
    placeKidCafeController.show
);

module.exports = router;