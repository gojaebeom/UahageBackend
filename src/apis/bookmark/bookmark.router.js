"use strict"
import { Router } from "express";
import { create, _delete } from "./bookmark.controller.js";

 const router = Router();
 
//BOOKMARK INSERT ⭐
router.post("/", /**@AUTH 보안 관련 미들웨어 필요 */ create);
//BOOKMARK DELETE ⭐
router.delete("/", /**@AUTH 보안 관련 미들웨어 필요 */ _delete);
 

// export router ✨ 
export default router;
