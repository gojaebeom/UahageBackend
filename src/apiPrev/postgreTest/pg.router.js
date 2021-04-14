const { test } = require("./pg.controller");
const router = require("express").Router();

router.get("/", test);

module.exports = router;