const router = require("express").Router();
const { post } = require("./ns.controller");

router.post("/nursery-schools", post);

module.exports = router;