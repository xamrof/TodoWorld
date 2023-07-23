import "dotenv/config";
import express, { Request, Response } from "express";
import cors from 'cors';
import user from './routes/users.routes'
import task from './routes/tasks.routes'
import { errorHandler } from "./middlewares/errorHandler";


(() => {
    const PORT = '3001'
    const app = express();

    app.use(cors());
    app.use(express.json());

    //Router
    app.use('/api/user', user)
    app.use('/api/task', task)

    //Middlewares    
    app.use(errorHandler)

    app.use('/', (req: Request, res: Response) => {
        res.json({status: 'Api is running'})
    })

    app.listen(PORT || process.env.PORT, () => {
        console.log('server connected');
    })
})();





