const { TransactionModel, validate_transaction } = require("../models/transaction.model.js")
exports.createTransation = async (req, res) => {
    const { error } = validate_transaction(req.body)
    if (error) {
        return res.send({ message: error.details[0].message })
    }
    let cardFound = await TransactionModel.find({ cardUUID: req.body.cardUUID })
    if (cardFound.length > 0) {
        cardFound = cardFound[cardFound.length - 1]
        let newCardData = {
            cardUUID: cardFound.cardUUID,
            initialBalance: cardFound.newBalance,
            transportFare: req.body.transportFare,
            newBalance: parseInt(cardFound.newBalance) - parseInt(req.body.transportFare),
        }
        const created = await TransactionModel.create(newCardData)
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

exports.deleteTransaction = async(req, res)=>{
    let transaction = await TransactionModel.findOne({_id:req.params.id})
    if(!transaction){
        return res.send({message: "No transaction found"});
    }
    return res.send({success:true}).status(200)
}