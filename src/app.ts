import "dotenv/config";
import express from "express";
import cors from 'cors';

const PORT = '3001'


const app = express();

app.use(cors());
app.use(express.json());


app.listen(PORT || process.env.PORT, () => {
    console.log('server connected');
})


