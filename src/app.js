import express, { query } from 'express';
import cors from "cors";
import { MongoClient, ObjectId  } from "mongodb";
import dotenv from 'dotenv';
import {signUp, signIn} from './controllers/authController.js'


//Config
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();




app.post("/sign-up", signUp) 

app.get("/sign-in", signIn)


app.listen(process.env.PORT,() => 
console.log(`Escutando na porta ${process.env.PORT}`));