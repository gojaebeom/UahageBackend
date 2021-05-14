"use strict";
import { Router } from "express";
//Middleware
import { authMiddleware } from "./middlewares/auth.middleware.js";
//Controller
import AuthController from "./apis/auth/auth.controller.js";
import AwsS3Controller from "./apis/aws/s3.controller.js";
import UserController from "./apis/user/user.controller.js";

const router = Router();

/**@Views 🎨*/
router.get("/maps/", ( req, res ) => res.render("index"));
router.get("/maps/show-place", ( req, res ) => res.render("showPlaces"));
router.get("/maps/show-place-name", ( req, res ) => res.render("showPlacesName"));
router.get("/maps/show-list", ( req, res ) => res.render("showList"));

/**@APIs 🍬*/
// Auth
router.post("/signup", AuthController.signup);
router.post("/signin", AuthController.signin);
// AWS S3
router.post("/images/:id", AwsS3Controller.post);
router.post("/images-delete", AwsS3Controller._delete);
// User 
router.get("/api/users/find-by-option", UserController.findByOption); 
router.get("/api/users", authMiddleware, UserController.index); 
router.get("/api/users/:id", authMiddleware, UserController.show);
router.post("/api/users", authMiddleware, UserController.create);
router.put("/api/users/:id", authMiddleware, UserController.update);
router.patch("/api/users/:id", authMiddleware, UserController.updateByOptions);
router.delete("/api/users/:id", authMiddleware, UserController._delete);


export default router;
