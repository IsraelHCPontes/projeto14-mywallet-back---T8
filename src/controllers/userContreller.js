import {transactionsCollection, usersCollection} from '../database/db.js'

export async function getTransactions(req, res){
    const {user} = res.locals;
    let saldo = 0

    function creatPackage({valor, type, title},name){
        if(type === "+"){
            saldo = saldo + valor;
        }else{
            saldo = saldo - valor
        }
        const transPackage ={
            title,
            valor,
            type,
            name,name,
            saldo: saldo
        }
        return transPackage
    }


    try{
        const transactionsAlready = await transactionsCollection.find({userId: user._id}).toArray();
        
        const {name} = await usersCollection.findOne({_id: transactionsAlready[0].userId}) 

        const transPackage = transactionsAlready.map((trans) => creatPackage(trans, name) )
        console.log(transPackage)
        res.status(200).send(transPackage);
        
    }catch(error){
        res.status(500).send(error);
        console.log(error)
    }
}
// db.transactions.insertOne({userId: ObjectId("6377eedc2ffe25518257cfef"), title: 'almoco', valor: 20, type: "+", date:'1/1/2022'  })
// db.transactions.insertOne({userId: ObjectId("6377eedc2ffe25518257cfef"), title: 'emprestimo', valor: 20, type: "-", date:'2/22/2022' })