"use strict"

import { Router } from "express";
import view   from "./map.controller.js"
 
const router = Router();
router.get("/", view.index);
router.get("/all-places", view.showAllPlaces);

export default router;