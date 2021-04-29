"use strict"
// import module or third-part-lib ✨
import express from "express";
import dotenv from "dotenv";
import postgreConnector from "./src/config/database.js";
import cors from "cors";
import morgan from "morgan";
import path from 'path';

// import api router ✨
import authRouter from "./src/apis/auth/auth.router.js";
import awsRouter from "./src/apis/aws/aws.router.js";
import userRouter from "./src/apis/user/user.router.js";
import placeRouter from "./src/apis/place/place.router.js";
import bookmarkRouter from "./src/apis/bookmark/bookmark.router.js";
import crwRouter from "./src/apis/nurserySchool/ns.router.js";
import prevDataInsertRouter from "./src/apis/place/dumps/prevDataInsert.js";
// import admin api router 🎇
import adminAuthRouter from "./src/apis/admin/auth/auth.router.js";
import adminManagerRouter from "./src/apis/admin/manager/manager.router.js";
import adminUserRouter from "./src/apis/admin/user/user.router.js";
import adminPlaceRouter from "./src/apis/admin/place/place.router.js";
//import mapRouter from "./src/pages/map/map.router.js";

// config 설정 이후 process.env.[key] 를 통해 .env의 key 값에 접근 가능
const __dirname = path.resolve();
dotenv.config();

//postgresql db connect
postgreConnector();

//express 객체 생성 및 app 변수에 할당
const app = express();

// set viewengine and middleware connecting ✨
// log setting if app mode is dev ✨
process.env.APP_MODE === "DEV" && app.use(morgan("dev"));

app.set("views","./public/views");
app.set("view engine" , "ejs");
// app.use(express.static(`${__dirname}/static`));
app.use(express.static(__dirname + '/public/static'));

app.use(cors({
    origin:"*"
}));
app.use(express.json());
app.use(express.urlencoded({
    limit: '150mb',
    extended: false,
}));

// set router ✨
// Page router
// // Page router
// app.use("/maps", mapRouter); // 맵
app.get("/maps/", ( req, res ) => {
    console.log("map index");
    res.render("index");
});
app.get("/maps/show-place", ( req, res ) => {
    console.log("map showPlace");
    res.render("show Places");
});
app.get("/maps/show-place-name", ( req, res ) => {
    console.log("map show Place Name");
    res.render("showPlacesName");
});
app.get("/maps/show-list", ( req, res ) => {
    console.log("map showList");
    res.render("showList");
});

// API admin router
app.use("/api/admin/auth", adminAuthRouter);
app.use("/api/admin/managers", adminManagerRouter);
app.use("/api/admin/users", adminUserRouter);
app.use("/api/admin/places", adminPlaceRouter);
// API router V1
app.use("/api/auth",      authRouter); // 로그인, 회원가입
app.use("/api/s3",        awsRouter); // 이미지 파일
app.use("/api/users",     userRouter); // 유저
app.use("/api/places",    placeRouter); // 유아관련 장소
app.use("/api/bookmarks", bookmarkRouter); // 유아관련 장소 북마크
app.use("/api/crw",       crwRouter); // 크롤링 (임시)
app.use("/api/prev-data", prevDataInsertRouter); // 이전 데이터 저장(임시)

// export express app ✨
// this app used by ./bin/www.js
export default app;