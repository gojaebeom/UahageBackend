import { Router } from "express";
import { post } from "./ns.controller.js";

const router = Router();
router.post("/nursery-schools", post);

export default router;