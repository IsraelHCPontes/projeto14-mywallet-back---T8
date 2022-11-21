import  signInSchema from '../schemas/signInSchema.js';
import { usersCollection } from '../database/db.js';
import bcrypt from 'bcrypt';

export async function signInValidationMiddleware(req, res, next){
    const user = req.body;
    const validation = signInSchema.validate(user, {abortEarly: false});
    if(validation.error){
        const erros = validation.error.details.map(detail => detail);
        res.status(409).send(erros);
        return;
    } 

    try{
       const userAready = await usersCollection.findOne({email:user.email})
       if(userAready && bcrypt.compareSync(user.password, userAready.password)){
        delete userAready.password
        res.locals.user = userAready;
        next();
       }else{
        res.status(401).send({message:'Email ou Senha incorreto'})
        return;
       }
    }catch(err){
        console.log(err)
        res.status(500).send({message: 'Deu erro no Midd'})
    }
};