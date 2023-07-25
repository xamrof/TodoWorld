import { NextFunction, Request, Response } from "express";

export class AuthController {

    private static _instance: AuthController;

    constructor(){}

    public static get instance(){
        return this._instance || (this._instance = new this());
    }


    public async registerUser(req: Request, res: Response, next: NextFunction): Promise<void>{
                
    }


    public async loginUser(req: Request, res: Response, next: NextFunction): Promise<void>{

    }

    
}