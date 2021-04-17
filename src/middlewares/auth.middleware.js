"use strict"

import jwt from "jsonwebtoken";
import { verifyToken } from "../utils/jwt.js";

export function authMiddleware(req, res, next){
    const { authorization } = req.headers;
    console.log(authorization);


    const result = verifyToken( authorization );
    if( result === "INVALID") 
        return res.status(403).json({
            message : "invalid token",
            data : false
        });
    if( result === "EXPIRED")
        return res.status(403).json({
            message : "expired token",
            data : false
        });
    
    console.log( result );

    next();
}