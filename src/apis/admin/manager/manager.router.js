"use strict"
import { Router } from "express";
import { index, show, create, update, _delete } from "./manager.controller.js";

const router = Router();
// list
router.get("/", index);
// detail
router.get("/:id", show); 
// create
router.post("/", create);
// update 
router.put("/:id", update);
// delete
router.delete("/:id", _delete);

export default router;