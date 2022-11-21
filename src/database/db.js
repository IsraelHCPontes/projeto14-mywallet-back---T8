import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
dotenv.config();
const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;
try{
    await mongoClient.connect();
    db =  mongoClient.db("myWallet");
}catch(err){
    console.log(err);
}

const usersCollection = db.collection('users');
const sessionsCollection = db.collection('sessions');
const transactionsCollection = db.collection('transactions');

export{usersCollection, sessionsCollection, transactionsCollection}

