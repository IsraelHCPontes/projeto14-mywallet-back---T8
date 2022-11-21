import joi from 'joi';

const newTransactionSchema = joi.object({
    valor: joi.number().required(),
    descricao: joi.string().required()
})

export default newTransactionSchema