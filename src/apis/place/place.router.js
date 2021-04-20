"use strict"
// import router ✨
import { Router } from "express";
import { index, show, create ,test } from "./place.controller.js";

const router = Router();
router.get("/test", test); //🥕
router.get("/", index);
router.get("/:id", show);
router.post("/", create);


export default router;