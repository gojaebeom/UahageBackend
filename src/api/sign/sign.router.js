const { login } = require("./sign.controller");

const router = require("express").Router();

router.post("/login", login);

module.exports = router;