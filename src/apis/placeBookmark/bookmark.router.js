"use strict"
import { Router } from "express";
import { create, _delete, show } from "./bookmark.controller.js";


const router = Router();
// const { create, _delete , show} = require("./bookmark.controller");

router.post("/", /**@AUTH 보안 관련 미들웨어 필요 */ create);

//DELETE /bookmarks?user_id=$user_id&space_id=$space_id
router.delete("/", /**@AUTH 보안 관련 미들웨어 필요 */ _delete);

// GET /bookmarks/:id  
//user_id의 모든 즐겨찾기 목록 보기
router.get("/:id", /**@AUTH 보안 관련 미들웨어 필요 */ show);

// export router ✨ 
export default router;
