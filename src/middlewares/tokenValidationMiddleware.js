import {sessionsCollection, usersCollection} from '../database/db.js'

export async function tokenValidation(req, res, next){
  const {authorization} = req.headers;
  const token = authorization?.replace('Bearer ', ''); 

  try{
    const session = await sessionsCollection.findOne({token})
    if(!session){
        res.sendStatus(401);
        return;
    }
    const user = await usersCollection.findOne({_id: session.userId });
    if(!user){
        res.sendStatus(401);
        return;
    }
    res.locals.user = user;
    next();
  }catch(error){
    console.log(error)
  }}
