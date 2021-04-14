"use strict"
import { Router } from "express";
import { post, _delete } from "./aws.controller.js";

const router = Router();
// const { post, _delete } = require("./aws.controller");

// delete image from AWS S3
router.post("/images/:id", post);
router.post("/images-delete", _delete);
//router.delete("/images", _delete);

export default router;
// module.exports = router;

