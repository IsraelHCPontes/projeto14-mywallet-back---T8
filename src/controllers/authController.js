import {usersCollection, sessionsCollection} from '../database/db.js'
import bcrypt from 'bcrypt';

export async function signUp (req, res) {
    const user = req.body;
    const passwordHash =  bcrypt.hashSync(user.password, 10)
    const newBody = {
        name: user.name,
        email: user.email,
        password: passwordHash
       }

    try{                
        
        await usersCollection.insertOne(newBody)   

        res.sendStatus(201);
    }catch(err){
        res.status(422).send(err)
    }   
}

export  async function signIn(req, res) {
    const {password, email} = req.body

    try{
        const nameAlready = await usersCollection.findOne({email});

        res.status(200).send(entradas)
    }catch(err){
        res.status(500).send(err.message)
    }
}