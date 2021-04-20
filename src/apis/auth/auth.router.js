"use strict"
import { Router } from "express";
import { signin, signup,check } from "./auth.controller.js";

const router = Router();
router.post("/signin", signin);
router.post("/signup", signup);
router.post("/check", check);

export default router;