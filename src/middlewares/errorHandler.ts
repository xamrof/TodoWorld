import { NextFunction, Request, Response } from "express";
import { CustomError } from "../models/customError";
import { HttpStatusCode } from "../utils/httpStatusCode";


export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {

    console.error(err.message)

    if(err instanceof CustomError){
        return res
            .status(err.httpCode)
            .json({code: err.message ? err.message: HttpStatusCode[res.statusCode], status: err.httpCode})
    }else {
        //unhandled errors
        res.status(500).json({code: HttpStatusCode[res.statusCode], status: HttpStatusCode.INTERNAL_SERVER_ERROR})
        next()
    }
    
}