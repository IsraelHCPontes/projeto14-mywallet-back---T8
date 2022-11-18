import {usersCollection} from '../database/db.js'

export async function signUp (req, res) {
  
    const {name, email} = req.body;

    try{
                         
        const userExiste = await usersCollection.findOne({name});
        const emailExiste = await usersCollection.findOne({email});

        if(userExiste || emailExiste){
            res.status(409).send({message:"Usuario ja existe"})
            return;
          }
        
         await usersCollection.insertOne(req.body)   

        res.sendStatus(201);
    }catch(err){
        res.status(422).send(err)
        console.log(usersCollection)
        
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