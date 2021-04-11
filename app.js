"use strict"

// import module or third-part-lib ✨
require("dotenv").config();
const express = require("express");
const userRouter = require("./src/api/user/user.router");

// create express object and put into variable ✨
const app = express();

// set viewengine and middleware connecting ✨
// log setting if app mode is dev ✨
process.env.APP_MODE === "DEV" && app.use(require("morgan")("dev"));
app.set("view engine", "pug");
app.use(express.json());

// set router ✨
// Page router

// API router
app.use("/users", userRouter);

// export express app ✨
// this app used by ./bin/www.js
module.exports = app;