import { PrismaClient, Task } from "@prisma/client";
import { getPriority } from "../helpers/priority";
import { TaskEditModel, TaskModel } from "../models/task.model.";
import { CustomError } from "../models/customError";
import { HttpStatusCode } from "../utils/httpStatusCode";
import { JwtPayload } from "jsonwebtoken";

export class TaskService {
    public static _instance: TaskService;

    private prisma : PrismaClient

    private constructor(){
        this.prisma = new PrismaClient()
    }


    public static get instance(){
        return this._instance || (this._instance = new this());
    }

    public async createTask (taskModel: TaskModel, userId: number): Promise<TaskModel> {
        
        const {priority, ...rest} = taskModel

        try {
            
            const priorityLvl = getPriority(priority);

            if(!priorityLvl){
                throw new CustomError('the date is less than the current date', HttpStatusCode.BAD_REQUEST)
            }

            const task = await this.prisma.task.create({
                data: {...rest, priority: priorityLvl, authorId: userId},
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

    public async getTask (taskId: number,userId: number): Promise<any>{
        
        try {

            const task = await this.prisma.task.findUnique(
                {
                    where: {id: taskId},
                    select: {title: true, description: true, priority: true, authorId: true}                
            })


            //TODO: DESECTRUCTURAR TASK PARA SACAR AUTHORID

            if(userId !== task?.authorId){
                throw new CustomError('the task does not correspond to the current user', HttpStatusCode.UNAUTHORIZED)
            }


            return task

        } catch (error) {
            throw error
        }

    }

    public async editTask (dataUpdated: TaskEditModel, userId: number, taskId: number): Promise<TaskEditModel>{

        try {

            const {priority, ...rest} = dataUpdated

            if(!priority){
                const taskUpdated = await this.prisma.task.update(
                    {
                      where: {id: taskId}, data: {...rest},
                      select: {title: true, description: true, priority: true, authorId: true}
                    }
                )

                if(userId !== taskUpdated.authorId){
                    throw new CustomError('the task does not correspond to the current user', HttpStatusCode.UNAUTHORIZED)
                }

                this.prisma.$disconnect()

                return taskUpdated    
            }


            const priorityLvl = getPriority(priority)

            const taskUpdated = await this.prisma.task.update(
                {
                  where: {id: taskId}, data: {...rest, priority: priorityLvl},
                  select: {title: true, description: true, priority: true, authorId: true,}
                }
            )


            if(userId !== taskUpdated.authorId){
                throw new CustomError('the task does not correspond to the current user', HttpStatusCode.UNAUTHORIZED)
            }

            this.prisma.$disconnect()

            return taskUpdated
        } catch (error) {
            throw error
        }

    }

    public async deleteTask (id: number): Promise<object>{
        return {msg: 'Task deleted'}
    }

}