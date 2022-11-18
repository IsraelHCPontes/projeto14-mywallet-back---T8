import bcrypt from 'bcrypt';
import signUpSchema from '../schemas/signUpSchema.js';

export default async function signUpValidation(req, res, next){
    const user = req.body;
    const passwordHash =  bcrypt.hashSync(user.password, 10)
    const validation = signUpSchema.validate(user, {abortEarly: false})
    if(validation.error){
        const erros = validation.error.details.map(detail => detail);
        res.status(409).send(erros);
        return;
    }
    const newBody = {
                     name:req.body.name,
                     email: req.body.email,
                     password: passwordHash
                    }
  
    req.body = newBody  
    
    console.log('to no mid', req.body)
    
    next();
}