"use strict"
// import module or third-part-lib ✨
import express from "express";
import dotenv from "dotenv";
import postgreConnector from "./src/config/database.js";
import cors from "cors";
import morgan from "morgan";

// import api router ✨
import authRouter from "./src/apis/auth/auth.router.js";
import awsRouter from "./src/apis/aws/aws.router.js";
import userRouter from "./src/apis/user/user.router.js";
import placeRouter from "./src/apis/place/place.router.js";
import bookmarkRouter from "./src/apis/placeBookmark/bookmark.router.js";
import crwRouter from "./src/apis/nurserySchool/ns.router.js";
import prevDataInsertRouter from "./src/apis/place/dumps/prevDataInsert.js";


// config 설정 이후 process.env.[key] 를 통해 .env의 key 값에 접근 가능
dotenv.config();

//postgresql db connect
postgreConnector();

//express 객체 생성 및 app 변수에 할당
const app = express();

// set viewengine and middleware connecting ✨
// log setting if app mode is dev ✨
process.env.APP_MODE === "DEV" && app.use(morgan("dev"));
app.set("view engine", "pug");
//...

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    limit: '150mb',
    extended: false,
}));

// set router ✨
// Page router

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