import {usersCollection, sessionsCollection} from '../database/db.js'
import bcrypt from 'bcrypt';
import {v4 as uuid} from 'uuid';



export async function signUp (req, res) {
    const user = req.body;
    const passwordHash =  bcrypt.hashSync(user.password, 10);
    const newBody = {
        name: user.name,
        email: user.email,
        password: passwordHash
       }

    try{                
        
        await usersCollection.insertOne(newBody); 

        res.sendStatus(201);
    }catch(err){
        res.status(422).send(err);
    }   
}

export  async function signIn(req, res) {
    const {user} = res.locals;
    const token = uuid();
    const newSession = {
        userId: user._id,
        token:token,
        time:Date.now()
    }
    console.log(user, token);
    
    try{
        const sessionAlready = await sessionsCollection.findOne({userId: user._id});

        if(sessionAlready){
            await sessionsCollection.deleteOne({userId: user._id});
        }
        await sessionsCollection.insertOne(newSession);
        res.status(201).send({token: token});
    }catch(err){
        res.status(500).send(err);
    }
}