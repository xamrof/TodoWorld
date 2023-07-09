import { Request, Response } from "express";
import { TaskService } from "../services/taskService";


export class TaskController {

    private static _instance: TaskController;

    constructor(){}

    public static get instance(){
        return this._instance || (this._instance = new this());
    }

    public async getTasks(req: Request, res: Response): Promise<void>{
        const users = await TaskService.instance.getAllTask();
        res.json(users)
    }

    public async getTask(req: Request, res: Response): Promise<void>{
        const user = await TaskService.instance.getTask(1234);
        res.json(user)
    }

    public async create(req: Request, res: Response): Promise<void>{
        const user = await TaskService.instance.createTask('pablo', 'maxwell@123', 23, 'number@123')
        res.json(user)
    }

    public async updated(req: Request, res: Response): Promise<void>{
        const user = await TaskService.instance.editTask(1234);
        res.json(user)
    }

    public async delete(req: Request, res: Response): Promise<void>{
        const user = await TaskService.instance.deleteTask(1234);
        res.json(user)
    }

}

