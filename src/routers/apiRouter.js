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

/**@APIs 🍬*/
// User Api
// kakao login 🍩
router.get('/api/auth/kakao/login', passport.authenticate('kakao'), userController.kakaoLogin);
router.get("/api/users/:id", auth, userController.show);
router.get("/api/users/validate-nickname/:nickname", auth, userController.validateByNickname);
router.get("/api/users/validate-email/:email", auth, userController.validateByEmail);
router.post("/api/users", auth, userController.store);
router.put("/api/users/:id", s3, userController.edit);
router.get("/api/users/logout", auth, userController.logout);
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

module.exports = router;