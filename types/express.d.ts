// import  {Request} from "express";
import {Request, Response, Express} from 'express-serve-static-core'
// import { TokenPayload } from "../src/models/tokenPayload";
import { JwtPayload } from 'jsonwebtoken'

declare module 'express-serve-static-core'{
    export interface Request{
        user?: JwtPayload
    }
}

// declare namespace Express {
//     interface Request {
//             user?: TokenPayload
//         }
//     }

export {}