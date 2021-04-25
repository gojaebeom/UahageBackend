"use strict"
import { Router } from "express";
import { select , create, _delete } from "./bookmark.controller.js";

 const router = Router();
//BOOKMARK SELECT 
router.get("/", /**@AUTH 보안 관련 미들웨어 필요 */ select);  //?user_id=[]&?place_id=[]
//BOOKMARK INSERT ⭐
router.post("/", /**@AUTH 보안 관련 미들웨어 필요 */ create);
//BOOKMARK DELETE ⭐
router.delete("/", /**@AUTH 보안 관련 미들웨어 필요 */ _delete); //?user_id=[]&?place_id=[]
 

// export router ✨ 
export default router;
