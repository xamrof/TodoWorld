import { UserModel } from "../models/user.model";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'

export class UserService {
    public static _instance: UserService;

    private prisma: PrismaClient

    private constructor(){
        this.prisma = new PrismaClient()
    }


    public static get instance(){
        return this._instance || (this._instance = new this());
    }

    public async createUser (userModel: UserModel): Promise<UserModel> {
        try {

            const password: string = bcrypt.hashSync(userModel.password, bcrypt.genSaltSync(10));

            const user = await this.prisma.user.create({
                data: {...userModel, password}});

            await this.prisma.$disconnect();

            return user
        } catch (error) {
            console.error(error)
            await this.prisma.$disconnect()
            throw error; 
        }
    }

    public async getAllUsers (): Promise<object>{
        return {msg: 'users'}
    }

    public async getUser (id: number): Promise<object>{
        return {msg: 'user'}
    }

    public async editUser (id: number): Promise<object>{
        return {msg: 'user edited'}
    }

    public async deleteUser (id: number): Promise<object>{
        return {msg: 'user deleted'}
    }

}
