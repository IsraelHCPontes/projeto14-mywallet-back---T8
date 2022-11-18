import dayjs from 'dayjs';
import joi from "joi";
import {usersCollection,
        sessionsCollection,
        transactionsCollection} from '../database/db.js'


//Schema
const userSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().required()
})

const signUpSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().required(),
})


export async function signUp (req, res) {
  
    const {name, email, password, confirmPassword} = req.body
    const time = dayjs().format('HH:mm:ss');
    const validation = signUpSchema.validate({name, email, confirmPassword, password}, {abortEarly:false});
   
    if(validation.error){
        const erros = validation.error.details.map(detail => detail.message)
        res.status(409).send(validation.error.details);
    }
    
    try{
                         
        const userExiste = await usersCollection.findOne({name});
        const emailExiste = await usersCollection.findOne({email});

        
        if(userExiste || emailExiste){
            res.status(409).send({message:"Usuario ja existe"})
            return;
          }
        
         await db.collection('users').insertOne({
             name:name, 
             email: email,
             password:password,
             lastStatus: Date.now()
            })   

        res.sendStatus(201);
    }catch{
        res.sendStatus(422);
        
    }   
}


export  async function signIn(req, res) {
    try{
        const entradas = await db.collection('entradas').find().toArray()
        res.status(200).send(entradas)
    }catch(err){
        res.status(500).send(err.message)
    }
}