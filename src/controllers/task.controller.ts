import { NextFunction, Request, Response } from "express";
import { TaskService } from "../services/taskService";
import { HttpStatusCode } from "../utils/httpStatusCode";
import { CustomError } from "../models/customError";


export class TaskController {

    private static _instance: TaskController;

    constructor(){}

    public static get instance(){
        return this._instance || (this._instance = new this());
    }

    public async getTasks(req: Request, res: Response, next: NextFunction): Promise<void>{
        
        const user = req.user

        if(!user){
            throw new CustomError('user invalid', HttpStatusCode.UNAUTHORIZED)
        }

        try {
            const tasks = await TaskService.instance.getAllTask(+user);
            res.status(200).json(tasks)
        } catch (error) {
            next(error) 
        }
        
        
    }

    public async getTask(req: Request, res: Response, next: NextFunction): Promise<void>{

        const user = req.user
        const {taskId} = req.params

        if(!user){
            throw new CustomError('user invalid', HttpStatusCode.UNAUTHORIZED)
        }

        try {
            const task = await TaskService.instance.getTask(+taskId, +user)
            res.status(200).json(task)
        } catch (error) {
            next(error)
        }
        
    }

    public async create(req: Request, res: Response, next: NextFunction): Promise<void>{

        const user = req.user

        if(!user){
            throw new CustomError('user invalid', HttpStatusCode.UNAUTHORIZED)
        }

        try {
            const {title, description, priority} = req.body

            const task = await TaskService.instance.createTask({title, description, priority}, +user)

            res.status(201).json({
                msg: 'Task Created',
                task
            })    
        } catch (error) {
            next(error)
        }


        
    }

    public async updated(req: Request, res: Response, next: NextFunction): Promise<void>{
        const user = req.user

        if(!user){
            throw new CustomError('user invalid', HttpStatusCode.UNAUTHORIZED)
        }

        try {
            const {...data} = req.body
            const {taskId} = req.params
    
            const taskUpdated = await TaskService.instance.editTask(data, +user, +taskId)
    
            res.status(200).json({
                msg: 'Task Updated',
                taskUpdated
            })
        } catch (error) {
            next(error)
        }
    }

    public async delete(req: Request, res: Response): Promise<void>{
        const user = await TaskService.instance.deleteTask(1234);
        res.json(user)
    }

}

