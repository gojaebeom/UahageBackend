"use strict"
const { testMode } = require("./pg.repository");

exports.test = async ( req, res ) => {
    console.log("request!");
    const data = await testMode();
    res.json({ data : data });
}