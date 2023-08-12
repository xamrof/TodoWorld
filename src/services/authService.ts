import { PrismaClient } from "@prisma/client";
import { decodePassword } from "../utils/bycriptPass";
import { CustomError } from "../models/customError";
import { HttpStatusCode } from "../utils/httpStatusCode";
import { createToken } from "../utils/jsonwebtoken";



export class AuthService {

    private prisma: PrismaClient
    
    private static _instance: AuthService;

    constructor(){
        this.prisma = new PrismaClient()
    }

    public static get instance(){
        return this._instance || (this._instance = new this());
    }


    public async loginUser(username: string, password: string){

        try {
            const verifyUser = await this.prisma.user.findUnique({
                where: {
                    user: username
                }
            })
    
            if(!verifyUser){
                throw new CustomError('The user not exist', HttpStatusCode.UNAUTHORIZED)
            }

            const pass = decodePassword(password, verifyUser.password)
    
            if(!pass){
                throw new CustomError('The password is incorrect', HttpStatusCode.UNAUTHORIZED)
            }

            const { id } = verifyUser

            const token = await createToken(id)
            return {token, verifyUser}
        } catch (error) {
            throw error
        }


    }    
}