import { PrismaClient } from "@prisma/client" 
import { CustomError } from "../models/customError"
import { HttpStatusCode } from "../utils/httpStatusCode"

const prisma = new PrismaClient()


export const emailExist = async (email = '') => {
    const emailExist = await prisma.user.findUnique({where: {email}})
    if(emailExist) {
        prisma.$disconnect()
        throw new CustomError('The email exist in database', HttpStatusCode.BAD_REQUEST)   
    }
}


export const userExist = async (user: string) => {
    const userExist = await prisma.user.findUnique({where: {user}})
    if(userExist){
        prisma.$disconnect()
        throw new CustomError('The user exist in database', HttpStatusCode.BAD_REQUEST)
    }
}

export const userNotExist = async(user: string) => {
    const userExist = await prisma.user.findUnique({where: {user}})
    if(!userExist){
        prisma.$disconnect()
        throw new CustomError('username already exist', HttpStatusCode.BAD_REQUEST)
    }
}

export const userByIdExist = async (id: string) => {
    const userExist = await prisma.user.findUnique({where: {id: parseInt(id)}})
    if(!userExist){
        prisma.$disconnect()
        throw new Error('The user does not exist in database')
    }
}

