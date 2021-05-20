"use strict";
/**@ImportModules ✨*/ 
const express = require("express"); 
const morgan = require("morgan");
const cors = require("cors");
const database = require("./configs/database"); 
const apiRouter = require("./routers/apiRouter");
const pageRouter = require("./routers/pageRouter");
const cookieParser = require("cookie-parser");
const path = require("path");
const passport = require("./configs/kakao");

/**@InitSettings ✨ */
// Database connect 🔌
database.connector();
// AWS s3 connect
require("./configs/awsS3");

// Express 객체화 및 할당
const app = express();
// Set Log
const APP_MODE = process.env.APP_MODE || "DEV";
APP_MODE === "DEV" && app.use(morgan("dev"));

/**@MiddlewareConnectings ✨ */
// Set viewengine : ejs 타입의 템플릿 앤진 사용 및 view, static 경로 설정
app.set("views", path.resolve(__dirname, "../public/views"));
app.set("view engine" , "ejs");
app.use(express.static(path.resolve(__dirname, "../public/static")));

// Set CORS : cors 개방 ( 배포시 변경 예정 )
app.use(cors({
    origin:"*"
}));

// Use json : req 객체에서 json 타입의 body 받기 
app.use(express.json());
// Use form-urlencoded : req 객체에서 x-www-form-urlencoded 타입의 body 받기
app.use(express.urlencoded({
    limit: '150mb',
    extended: false,
}));

// Use cookieParser : req , res 객체에서 .cookie 사용
app.use(cookieParser());

// passport connection
app.use(passport.initialize());
app.use(passport.session());

// Set Router : router 연결
app.use(pageRouter);
app.use(apiRouter);

/**@AppListening : 8000 포트에서 서버 실행 */
const PORT = process.env.APP_PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on : ${PORT}`));