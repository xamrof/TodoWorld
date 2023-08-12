import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jsonwebtoken";
import { CustomError } from "../models/customError";
import { HttpStatusCode } from "../utils/httpStatusCode";

import { JwtPayload } from "jsonwebtoken";


export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization || '';

    if(!token){
        throw new CustomError('Jwt is neccesary', HttpStatusCode.UNAUTHORIZED )
    }
   
    try {
        const jwt = token.split(" ").pop();
        const decodedToken = verifyToken(`${jwt}`) as JwtPayload
        req.user = decodedToken.payload
        next();
        
    } catch (error) {
        throw error
    }
}