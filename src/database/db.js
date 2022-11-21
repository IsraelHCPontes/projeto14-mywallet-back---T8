import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
dotenv.config();
const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;
let usersCollection 
let sessionsCollection 
let transactionsCollection 

async function dataBase(){
try{
    await mongoClient.connect();
    db =  mongoClient.db("myWallet");
    usersCollection = db.collection('users');
    sessionsCollection = db.collection('sessions');
    transactionsCollection = db.collection('transactions');
}catch(err){
    console.log(err);
    }
}
dataBase()



export{usersCollection, sessionsCollection, transactionsCollection}

