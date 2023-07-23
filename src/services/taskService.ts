import { PrismaClient } from "@prisma/client";
import { getPriority } from "../helpers/priority";
import { TaskModel } from "../models/task.model.";
import { CustomError } from "../models/customError";
import { HttpStatusCode } from "../utils/httpStatusCode";

export class TaskService {
    public static _instance: TaskService;

    private prisma : PrismaClient

    private constructor(){
        this.prisma = new PrismaClient()
    }


    public static get instance(){
        return this._instance || (this._instance = new this());
    }

    public async createTask (taskModel: TaskModel): Promise<TaskModel> {
        
        const {priority, ...rest} = taskModel

        try {
            
            const priorityLvl = getPriority(priority);

            const task = await this.prisma.task.create({
                data: {...rest, priority: priorityLvl},
                select: {title: true, description: true, priority: true, authorId: true}
            })

            await this.prisma.$disconnect();

            return task;
            
        } catch (error) {
            this.prisma.$disconnect();
            throw error;
        }



    }

    public async getAllTask (userId: number): Promise<TaskModel[]>{
        try {

            //TODO: REVISAR POR QUE ME DA UN ARRAY VACIO

            const tasks = await this.prisma.task.findMany({where: {
                authorId: userId
            }})

            if(!tasks.length){
                this.prisma.$disconnect()
                throw new CustomError("this user doesn't any task", HttpStatusCode.BAD_REQUEST)
            }

            return tasks
        } catch (error) {
            await this.prisma.$disconnect()
            throw error
        }
    }

    public async getTask (id: number): Promise<object>{
        return {msg: 'Task'}
    }

    public async editTask (id: number): Promise<object>{
        return {msg: 'Task edited'}
    }

    public async deleteTask (id: number): Promise<object>{
        return {msg: 'Task deleted'}
    }

}