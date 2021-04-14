"use strict"
const router = require("express").Router();
const { post, _delete } = require("./aws.controller");

// delete image from AWS S3
router.post("/images/:id", post);
router.post("/images-delete", _delete);
//router.delete("/images", _delete);

module.exports = router;

