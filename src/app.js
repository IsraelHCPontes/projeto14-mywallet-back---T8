import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import authRouter from './routers/authRouter.js'
import userRouter from './routers/userRouter.js'


//Config
const app = express();
app.use(cors());
app.use(express.json());
app.use(authRouter);
app.use(userRouter);
dotenv.config();



app.listen(process.env.PORT,() => 
console.log(`Escutando na porta ${process.env.PORT}`));