import jwt, {JsonWebTokenError} from "jsonwebtoken"
import { CustomError } from "../models/customError"
import { HttpStatusCode } from "./httpStatusCode"

const privateKey = process.env.SECRETKEY

if (!privateKey) {
    throw new Error('Private Key is not defined in the environment variables.');
}

export const createToken = (payload: any) => {

    return new Promise((resolve, reject) => {
        jwt.sign({payload}, privateKey, {
            expiresIn: '4h'
        }, (error, token) => {
            if(error){
                reject(new CustomError('internal server error create token', HttpStatusCode.INTERNAL_SERVER_ERROR))
            }else{
                resolve(token)
            }
        })
    })
}

export const verifyToken = (token: string) => {
    try {
        const userToken = jwt.verify(token, privateKey)
        return userToken
    } catch (error) {
        throw new CustomError('Invalid token', HttpStatusCode.UNAUTHORIZED)
    }
}
