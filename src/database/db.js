import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
dotenv.config();
const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;
// let usersCollection 
// let sessionsCollection 
// let transactionsCollection 


try {
    const res = await mongoClient.connect();
  } catch (error) {
    console.log(error);
  }
  
  db = mongoClient.db('mywalley');



export const usersCollection = db.collection('users');
export const  sessionsCollection = db.collection('sessions');
export const transactionsCollection = db.collection('transactions');


