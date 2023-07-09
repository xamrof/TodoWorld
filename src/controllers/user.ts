import { Request, Response } from "express";
import { UserService } from "../services/userService";

export class UserController {

    private static _instance: UserController;

    constructor(){}

    public static get instance(){
        return this._instance || (this._instance = new this());
    }

    public async getUsers(req: Request, res: Response): Promise<void>{
        const users = await UserService.instance.getAllUsers();
        res.json(users)
    }

    public async getUser(req: Request, res: Response): Promise<void>{
        const user = await UserService.instance.getUser(1234);
        res.json(user)
    }

    public async create(req: Request, res: Response): Promise<void>{
        const user = await UserService.instance.createUser('pablo', 'maxwell@123', 23, 'number@123')
        res.json(user)
    }

    public async updated(req: Request, res: Response): Promise<void>{
        const user = await UserService.instance.editUser(1234);
        res.json(user)
    }

    public async delete(req: Request, res: Response): Promise<void>{
        const user = await UserService.instance.deleteUser(1234);
        res.json(user)
    }

}

