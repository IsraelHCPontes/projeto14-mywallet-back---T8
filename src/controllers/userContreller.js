import {transactionsCollection} from '../database/db.js'

export async function getTransactions(req, res){
    const {user} = res.locals;

    try{
        const transactions = await transactionsCollection.find({userId: user._id}).toArray();
        res.status(200).send(transactions);
    }catch({response}){
        res.status(500).send(token);
        console.log(token)
    }
}
// db.transactions.insertOne({userId: ObjectId("6377eedc2ffe25518257cfef"), title: 'almoco', valor: 20, type: "+", date:'1/1/2022'  })
// db.transactions.insertOne({userId: ObjectId("6377eedc2ffe25518257cfef"), title: 'emprestimo', valor: 20, type: "-", date:'2/22/2022' })