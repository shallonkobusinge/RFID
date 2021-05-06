const Joi = require('joi')
const mongoose = require('mongoose')
Joi.ObjectId = require("joi-objectid")(Joi);

const CardSchema = mongoose.Schema({

    cardNumber: {
        type: String,
        required: true,
        
    },
    initialBalance: {
        type: String,
        required: true
    }
}, {
    timestamp: true,
})

exports.Card = mongoose.model('Card', CardSchema)

exports.validate_card = (card) => {
    const schema = Joi.object({
        cardNumber: Joi.string().required(),
        initialBalance: Joi.string().required(),
    })
    return schema.validate(card)
}