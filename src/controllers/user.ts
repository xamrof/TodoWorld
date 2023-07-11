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
        
        try {
            const {user, age, email, password} = req.body
            const newUser = await UserService.instance.createUser({user, age, email, password})
            if(newUser){
                res.status(201).json({
                    user: newUser
                })
            }
        } catch (error) {
            
        }
        
        
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

