import { Router } from "express";
import { post } from "./ns.controller.js";

const router = Router();
router.post("/", post);

export default router;