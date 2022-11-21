import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let cachedDb;

const client = new MongoClient(`${process.env.MONGO_URI}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function connectMongoDB() {
  if (cachedDb) {
    return { db: cachedDb, client };
  }

  await client.connect();

  const db = client.db(process.env.MONGO_DB);
  cachedDb = db;

  return { db, client };
}

// import { MongoClient } from "mongodb";
// import dotenv from 'dotenv';
// dotenv.config();
// const mongoClient = new MongoClient(process.env.MONGO_URI);
// let db;
// let usersCollection 
// let sessionsCollection 
// let transactionsCollection 

// async function dataBase(){
// try{
//     await mongoClient.connect();
//     db =  mongoClient.db("myWallet");
//     usersCollection = db.collection('users');
//     sessionsCollection = db.collection('sessions');
//     transactionsCollection = db.collection('transactions');
// }catch(err){
//     console.log(err);
//     }
// }
// dataBase()


// export{usersCollection, sessionsCollection, transactionsCollection}

