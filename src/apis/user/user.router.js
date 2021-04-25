"use strict"
import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { index, show, create, update, _delete, findByOption, updateByOptions } from "./user.controller.js";

const router = Router();
//🥕
router.get("/find-by-option", findByOption); 
// GET /users ? 선택적으로 querystring 사용 가능, 사용하지 않으면 default
router.get("/", authMiddleware, index); 
// GET /users/:id
router.get("/:id", authMiddleware, show);
// POST /users 
router.post("/", authMiddleware, create);
// PUT /users/:nickname
router.put("/:id", authMiddleware, update);
// PATCH /users/:id
router.patch("/:id", authMiddleware, updateByOptions);
// DELETE /users/:id
router.delete("/:id", authMiddleware, _delete);


// export router ✨
export default router;