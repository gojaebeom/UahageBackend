"use strict"
// import module or third-part-lib ✨
require("dotenv").config();
require("./src/config/pgDatabase");
const express = require("express");
const userRouter = require("./src/api/user/user.router");
const awsRouter = require("./src/api/aws/aws.router");
const spaceRouter = require("./src/api/space/space.router");
const bookmarkRouter = require("./src/api/bookmark/bookmark.router");
const cors = require('cors');
const signRouter = require("./src/api/sign/sign.router");
const nurserySchoolRouter = require("./src/api/nurserySchool/ns.router");
const pgTest = require("./src/api/postgreTest/pg.router");
// create express object and put into variable ✨
const app = express();

// set viewengine and middleware connecting ✨
// log setting if app mode is dev ✨
process.env.APP_MODE === "DEV" && app.use(require("morgan")("dev"));
app.set("view engine", "pug");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    limit: '150mb',
    extended: false,
}));

// set router ✨
// Page router

// API router
app.use("/s3", awsRouter);
app.use("/users", userRouter);
app.use("/spaces", spaceRouter);
app.use("/users/bookmark", bookmarkRouter);
app.use("/sign", signRouter);
app.use("/crw", nurserySchoolRouter);
app.use("/pg/", pgTest);


// export express app ✨
// this app used by ./bin/www.js
module.exports = app;