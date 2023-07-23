import { NextFunction, Request, Response } from "express";
import { TaskService } from "../services/taskService";
import { HttpStatusCode } from "../utils/httpStatusCode";


export class TaskController {

    private static _instance: TaskController;

    constructor(){}

    public static get instance(){
        return this._instance || (this._instance = new this());
    }

    public async getTasks(req: Request, res: Response, next: NextFunction): Promise<void>{
        
        const {id} = req.params

        try {
            const tasks = await TaskService.instance.getAllTask(+id);
            res.status(200).json(tasks)
        } catch (error) {
            next(error)
        }
        
        
    }

    public async getTask(req: Request, res: Response, next: NextFunction): Promise<void>{
        const user = await TaskService.instance.getTask(1234);
        res.json(user)
    }

    public async create(req: Request, res: Response, next: NextFunction): Promise<void>{

        try {
            const {title, description, priority, authorId} = req.body

            const task = await TaskService.instance.createTask({title, description, priority, authorId})

            res.status(201).json({
                msg: 'Task Created',
                task
            })    
        } catch (error) {
            next(error)
        }


        
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

