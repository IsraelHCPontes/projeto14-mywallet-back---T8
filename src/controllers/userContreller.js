import connectMongoDB from '../database/db.js'


export async function getTransactions(req, res){
    const {user} = res.locals;
    let saldo = 0;
 
    function creatPackage({valor, type, title,date},name){
        if(type === "+"){
            saldo = Number(saldo) +  Number(valor);
        }else{
            saldo = saldo - valor;
        }
        const transPackage ={
            title,
            valor,
            type,
            date,
            name,
            saldo
        }
        return transPackage
    }


    try{
        const { db } = await connectMongoDB();
        
        const transactions = await  db.collection("transactions").find({userId: user._id}).toArray();
        
        const {name} =  await  db.collection("users").findOne({_id: transactions[0].userId}) 

        const transPackage = transactions.map((trans) => creatPackage(trans, name) )
        console.log(transPackage)
        res.status(200).send(transPackage);
        
    }catch(error){
        res.status(500).send(error);
        console.log(error)
    }
}


export async function postNewTransaction(req, res){
    const {user} = res.locals;
    const {valor, title, type} =req.body;
    const hoje = new Date();

    
    const transPackage ={
        userId: user._id,
        title: title,
        valor: valor,
        type: type,
        date: hoje.toLocaleDateString("pt-br")
    }
    try{
        const { db } = await connectMongoDB();
        await  db.collection("transactions").insertOne(transPackage)
       res.sendStatus(201)
    }catch(error){
        res.status(500).send(error)
    }
}
// db.transactions.insertOne({userId: ObjectId("6377eedc2ffe25518257cfef"), title: 'almoco', valor: 20, type: "+", date:'1/1/2022'  })
// db.transactions.insertOne({userId: ObjectId("6377eedc2ffe25518257cfef"), title: 'emprestimo', valor: 20, type: "-", date:'2/22/2022' })