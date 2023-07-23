export class CustomError extends Error {
    public readonly message: string;
    public readonly httpCode: number;

    constructor(message: string, statusCode: number){
        super(message)

        this.message = message
        this.httpCode = statusCode

        Error.captureStackTrace(this)
    }

}