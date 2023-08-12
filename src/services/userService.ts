import { EditUserModel, UserModel } from "../models/user.model";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import { CustomError } from "../models/customError";
import { HttpStatusCode } from "../utils/httpStatusCode";
import { encodePassword } from "../utils/bycriptPass";

export class UserService {
    public static _instance: UserService;

    private prisma: PrismaClient

    private constructor(){
        this.prisma = new PrismaClient()
    }


    public static get instance(){
        return this._instance || (this._instance = new this());
    }

    public async createUser (userModel: UserModel): Promise<any> {

        //TODO: CREAR ERROR Y AUTENTIFICACION

        try {

            const password = encodePassword(userModel.password)

            //TODO: La razón por la que no da el error de que no detecta el password es por que falta el middleware
                      
            const user = await this.prisma.user.create({
                data: {...userModel, password},
                select: {id: true, user: true, age: true, email: true}});

            await this.prisma.$disconnect();

            return user
        } catch (error) {
            await this.prisma.$disconnect()
            throw error; 
        }
    }

    public async getAllUsers (): Promise<UserModel[]>{
        try {
            const users = await this.prisma.user.findMany();    

            if(!users){
                this.prisma.$disconnect()
                throw new CustomError("don't have users in database", HttpStatusCode.BAD_REQUEST)
            }

            return users;
        } catch (error) {
            await this.prisma.$disconnect()
            throw error; 
        }
           
    }

    public async getUser (id: number): Promise<UserModel>{
        try {
            const user = await this.prisma.user.findUnique({where: {id}})
            if(!user){
                this.prisma.$disconnect()
                throw new CustomError("the user does not exist", HttpStatusCode.UNPROCESSABLE_ENTITY)
            }

            this.prisma.$disconnect()

            return user
        } catch (error) {
            await this.prisma.$disconnect()
            throw error; 
        }
    }

    public async editUser (id: number, editUserModel: EditUserModel): Promise<EditUserModel>{

        //TODO: CREAR ERROR Y AUTENTIFICACION

        const {password} = editUserModel

        if(password){
            editUserModel.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));    
        }

        try {

            const user = await this.prisma.user.update({
                where: {id},
                data: {...editUserModel}
            });

            this.prisma.$disconnect()
            
            return user 
            

        } catch (error) {
            await this.prisma.$disconnect()
            throw error; 
        }

        
    }

    public async deleteUser (id: number): Promise<object>{
        
        //TODO: CREAR ERROR Y AUTENTIFICACION
        
        try {
            const user = await this.prisma.user.delete({
                where: {id},
                select: {
                    user: true
                }
            })

            if(!user){
                this.prisma.$disconnect()
                throw new CustomError("the user does not exist", HttpStatusCode.BAD_REQUEST)
            }

            return user

        } catch (error) {
            await this.prisma.$disconnect()
            throw error
        }
        


    
    }

}
