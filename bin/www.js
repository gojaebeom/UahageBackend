"use strict"
import app from "../app.js";
// const app = require("../app");

app.listen(
    process.env.APP_PORT, 
    () => console.log(`server is running on ${process.env.APP_PORT}`)
);
