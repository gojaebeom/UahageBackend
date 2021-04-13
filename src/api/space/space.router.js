"use strict"

// import router ✨
const router = require("express").Router();
const { show } = require("./space.controller");

 
//GET /spaces/:space_code
router.get("/:space_code", show);

module.exports = router;