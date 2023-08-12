import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/userService";

export class UserController {

    private static _instance: UserController;

    constructor(){}

    public static get instance(){
        return this._instance || (this._instance = new this());
    }

    public async getUsers(req: Request, res: Response): Promise<void>{
        const users = await UserService.instance.getAllUsers();
        res.status(200).json(users)
    }

    public async getUser(req: Request, res: Response, next: NextFunction): Promise<void>{
    
        try {
            const {id} = req.params
            console.log(typeof id)
            const user = await UserService.instance.getUser(+id);
            if(user){
                res.status(200).json({
                    user
                })
            }
        } catch (error) {
            next(error)
        }
    
    }

    public async create(req: Request, res: Response, next: NextFunction): Promise<void>{
        
        try {
            const {user, age, email, password} = req.body
            const newUser = await UserService.instance.createUser({user, age, email, password})
            if(newUser){
                res.status(201).json({
                    msg: 'user created',
                    user: newUser
                })
            }
        } catch (error) {
            next(error)
        }
        
        
    }

    public async updated(req: Request, res: Response, next: NextFunction): Promise<void>{
        try {
            const {id} = req.params

            const {age, ...rest} = req.body

            const userUpdated = await UserService.instance.editUser(+id, rest);

            if(userUpdated){
                res.status(200).json({
                    msg: 'user updated',
                    user: userUpdated 
                })
            }

        } catch (error) {
            next(error)
        }
        
    }

    public async delete(req: Request, res: Response, next: NextFunction): Promise<void>{
        
        try {
            const {id} = req.params;

            const user = await UserService.instance.deleteUser(+id);

            res.status(200).json({
                msg: 'user deleted',
                user
            })
    
        } catch (error) {
            next(error)
        }
    
    }

}

