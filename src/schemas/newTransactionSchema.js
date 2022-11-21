import joi from 'joi';

const newTransactionSchema = joi.object({
    valor: joi.number().required(),
    title: joi.string().required(),
    type: joi.string().required()
})

export default newTransactionSchema