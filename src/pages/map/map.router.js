"use strict" 
import { Router } from "express";

const router = Router();

router.get("/", async ( req, res ) => {
    console.log("map index");
    res.render("index");
});

router.get("/all-places", async ( req, res ) => {
    console.log("map showAllPlace");
    res.render("showAllPlaces");
});

export default router;