"use strict"
import { Router } from "express";
import { index, show, create, update, _delete, findByOptions, updateByOptions } from "./user.controller.js";


const router = Router();
// GET /users ? 선택적으로 querystring 사용 가능, 사용하지 않으면 default
router.get("/", index); 
// GET /users/:id
router.get("/:id", show);
// POST /users 
router.post("/", /**@AUTH 보안 관련 미들웨어 필요 */ create);
// PUT /users/:nickname
router.put("/:id", /**@AUTH 보안 관련 미들웨어 필요 */ update);
// PATCH /users/:id
router.patch("/:id", /**@AUTH 보안 관련 미들웨어 필요 */ updateByOptions);
// DELETE /users/:id
router.delete("/:id", /**@AUTH 보안 관련 미들웨어 필요 */ _delete);

// export router ✨
export default router;

