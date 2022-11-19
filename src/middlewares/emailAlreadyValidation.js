import { usersCollection } from "../database/db.js";

export async function emailAlreadyValidation(req, res, next){
    const {email} = req.body;

    try{                
        // const userExiste = await usersCollection.findOne({name});
        const emailExiste = await usersCollection.findOne({email});

        if(emailExiste){
            res.status(409).send({message:"Email já existe"});
            return;
          }
          
        next();
        
    }catch(err){
        res.status(402).send(err);
    }   
}