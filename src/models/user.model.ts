export interface UserModel{

    user: string;
    password: string;
    age: number;
    email: string;
}

export interface EditUserModel{
    user?: string;
    password?: string,
    email?: string
}