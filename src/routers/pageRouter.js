"use strict";
const { Router } = require("express");
const router = Router();

/**@Views 🎨*/
router.get("/", ( req, res ) => res.render("main"));
router.get("/maps", ( req, res ) => res.render("index"));
router.get("/maps/show-place", ( req, res ) => res.render("showPlaces"));
router.get("/maps/show-place-name", ( req, res ) => res.render("showPlacesName"));
router.get("/maps/show-list", ( req, res ) => res.render("showList"));

module.exports = router;