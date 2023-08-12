import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/authService";

export class AuthController {

    private static _instance: AuthController;

    constructor(){}

    public static get instance(){
        return this._instance || (this._instance = new this());
    }

    public async loginUser(req: Request, res: Response, next: NextFunction): Promise<void>{
        try {
            const {user, password} = req.body
            const loginUser = await AuthService.instance.loginUser(user, password)
            res.status(200).json({loginUser})
        } catch (error) {
            next(error)
        }
        
    }   

    
}