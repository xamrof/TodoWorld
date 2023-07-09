
export class TaskService {
    public static _instance: TaskService;


    private constructor(){}


    public static get instance(){
        return this._instance || (this._instance = new this());
    }

    public async createTask (user: string, password: string, age: number, email: string): Promise<object> {
        return {msg: 'Task created'}    
    }

    public async getAllTask (): Promise<object>{
        return {msg: 'Tasks'}
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