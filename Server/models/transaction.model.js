const Joi = require('joi')
const mongoose = require('mongoose')
Joi.ObjectId = require("joi-objectid")(Joi);

const TransactionSchema = mongoose.Schema({

    cardUUID: {
        type: String,
        required: true
    },
    initialBalance: {
        type: String,
    },
    transportFare: {
        type: String,

    },
    newBalance: {
        type: String,
    }
}, {
    timestamps: true
})

exports.TransactionModel = mongoose.model('Transaction', TransactionSchema)

exports.validate_transaction = (transaction) => {
    const schema = Joi.object({
        cardUUID: Joi.string().required(),
        initialBalance: Joi.string(),
        transportFare: Joi.string(),
        newBalance: Joi.string(),
    })
    return schema.validate(transaction)
}