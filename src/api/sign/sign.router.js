import { Router } from "express";
import { login } from "./sign.controller.js";

const router = Router();
router.post("/login", login);

export default router;