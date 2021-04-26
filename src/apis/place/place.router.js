"use strict"
// import router ✨
import { Router } from "express";
import { index, show, create , search } from "./place.controller.js";

const router = Router();
//PLACE VIEW 
router.get("/search", search);  // - type=all    ?place_code=[] 
                                // - type=filter ?menu=[]&bed=[]&tableware=[]&meetingroom=[]&diapers=[]&playroom=[]&carriage=[]&nursingroom=[]&chair=[]

//PLACES AND USER_BOOKMARK VIEW(ORDER BY distance)
router.get("/", index);         
router.get("/:id", show);
// router.get("/placeName/:id", show);
router.post("/", create);


export default router;