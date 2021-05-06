const { TransactionModel, validate_transaction } = require("../models/transaction.model.js")
const { Card } = require("../models/card.model.js")
exports.createTransation = async (req, res) => {
    const { error } = validate_transaction(req.body)
    if (error) {
        return res.send({ message: error.details[0].message })
    }
    let cardFound = await TransactionModel.findOne({ cardUUID: req.body.cardUUID })
    if (cardFound) {
        let saved = {
            cardUUID: cardFound.cardUUID,
            initialBalance: cardFound.newBalance,
            transportFare: req.body.transportFare,
            newBalance: cardFound.initialBalance - req.body.transportFare,
        }
        console.log(saved)
        // const transaction = new TransactionModel(saved)
        // cardFound = {...cardFound,...saved}
        cardFound.initialBalance = cardFound.newBalance;
        cardFound.transportFare = req.body.transportFare
        cardFound.newBalance = cardFound.initialBalance - req.body.transportFare
        const created = await cardFound.save()
        if (created) {
            return res.send({ transaction: created, message: "Card already exists" })
        }


    }

    const saved = {
        cardUUID: req.body.cardUUID,
        initialBalance: req.body.initialBalance,
        transportFare: req.body.transportFare,
        newBalance: req.body.initialBalance - req.body.transportFare
    }
    const transaction = new TransactionModel(saved)
    const created = await transaction.save()
    if (created) {
        return res.send({ transaction: created, message: "New card was created" })
    }


}
exports.getTransactions = async (req, res) => {
    let transactions = await TransactionModel.find()
    if (transactions) {
        return res.send({ transactions: transactions })
    } else {
        return res.send({ message: 'No transactions found' })
    }
}