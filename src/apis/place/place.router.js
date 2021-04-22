"use strict"
// import router ✨
import { Router } from "express";
import { index, show, create , search } from "./place.controller.js";

const router = Router();
router.get("/search", search); 
router.get("/", index); 
router.get("/:id", show);
router.post("/", create);


export default router;