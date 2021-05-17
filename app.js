"use strict"
// import module or third-part-lib ✨
import express from "express";
import dotenv from "dotenv";
import postgreConnector from "./src/config/database.js";
import cors from "cors";
import morgan from "morgan";
import path from 'path';
import router from "./src/routes.js";

// config 설정 이후 process.env.[key] 를 통해 .env의 key 값에 접근 가능
const __dirname = path.resolve();
dotenv.config();

//postgresql db connect
postgreConnector();

//express 객체 생성 및 app 변수에 할당
const app = express();

// log setting if app mode is dev ✨
process.env.APP_MODE === "DEV" && app.use(morgan("dev"));

// set viewengine and middleware connecting ✨
app.set("views","./public/views");
app.set("view engine" , "ejs");
app.use(express.static(__dirname + '/public/static'));

// set CORS
app.use(cors({
    origin:"*"
}));

// set body parser
app.use(express.json());
app.use(express.urlencoded({
    limit: '150mb',
    extended: false,
}));

// set router ✨
app.use(router);


// export express app ✨
// this app used by ./bin/www.js
export default app;