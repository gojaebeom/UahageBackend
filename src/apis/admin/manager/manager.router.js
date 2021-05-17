"use strict"
import { Router } from "express";
import { index, show, create, update, _delete } from "./manager.controller.js";
import { authMiddleware } from "../../../middlewares/auth.middleware.js";

const router = Router();
// list
router.get("/", authMiddleware, index);
// detail
router.get("/:id", authMiddleware, show); 
// create
// router.post("/", create);
// update 
router.put("/:id", authMiddleware, update);
// delete
router.delete("/:id", authMiddleware, _delete);

export default router;

