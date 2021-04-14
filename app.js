"use strict"
// import module or third-part-lib ✨
import express from "express";
import dotenv from "dotenv";
import postgreConnector from "./src/config/pgDatabase.js";
import cors from "cors";
import morgan from "morgan";

// import api router ✨
import awsRouter from "./src/api/aws/aws.router.js";
import signRouter from "./src/api/sign/sign.router.js";
import userRouter from "./src/api/user/user.router.js";
import spaceRouter from "./src/api/space/space.router.js";
import bookmarkRouter from "./src/api/bookmark/bookmark.router.js";
import crwRouter from "./src/api/nurserySchool/ns.router.js";

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
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    limit: '150mb',
    extended: false,
}));

// set router ✨
// Page router

// API router V1
app.use("/s3",        awsRouter);
app.use("/users",     userRouter);
app.use("/spaces",    spaceRouter);
app.use("/bookmarks", bookmarkRouter);
app.use("/sign",      signRouter);
app.use("/crw",       crwRouter);


// export express app ✨
// this app used by ./bin/www.js
export default app;