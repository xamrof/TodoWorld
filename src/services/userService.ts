
export class UserService {
    public static _instance: UserService;


    private constructor(){}


    public static get instance(){
        return this._instance || (this._instance = new this());
    }

    public async createUser (user: string, password: string, age: number, email: string): Promise<object> {
        return {msg: 'user created'}    
    }

    public async getAllUsers (): Promise<object>{
        return {msg: 'users'}
    }

    public async getUser (id: number): Promise<object>{
        return {msg: 'user'}
    }

    public async editUser (id: number): Promise<object>{
        return {msg: 'user edited'}
    }

    public async deleteUser (id: number): Promise<object>{
        return {msg: 'user deleted'}
    }

}
