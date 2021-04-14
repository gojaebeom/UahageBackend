"use strict"
// import router ✨
import { Router } from "express";
import { show } from "./space.controller.js";

const router = Router();
//GET /spaces/:space_code
router.get("/:space_code", show);

export default router;