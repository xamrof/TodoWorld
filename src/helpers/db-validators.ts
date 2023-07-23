import { PrismaClient } from "@prisma/client" 

const prisma = new PrismaClient()


export const emailExist = async (email = '') => {
    const emailExist = await prisma.user.findUnique({where: {email}})
    if(emailExist) {
        prisma.$disconnect()
        throw new Error('The email exist in database')   
    }
}


export const userExist = async (user: string) => {
    const userExist = await prisma.user.findUnique({where: {user}})
    if(userExist){
        prisma.$disconnect()
        throw new Error('The user exist in database')
    }
}

export const userByIdExist = async (id: string) => {
    const userExist = await prisma.user.findUnique({where: {id: parseInt(id)}})
    if(!userExist){
        prisma.$disconnect()
        throw new Error('The user does not exist in database')
    }
}

