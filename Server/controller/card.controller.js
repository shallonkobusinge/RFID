
const { Card, validate_card } = require("../models/card.model.js")
exports.createCard = async (req, res) => {
    const { error } = validate_card(req.body)
    if (error) {
        return res.send({ message: error.details[0].message })
    }
    const cardFound = await Card.findOne({ cardNumber: req.body.cardNumber })
    if (cardFound) {

        return res.send({ message: "Card Already Found" })


    }
    const saved = {
        cardNumber: req.body.cardNumber,
        initialBalance: req.body.initialBalance
    }
    const card = new Card(saved)
    const created = await card.save()
    if (created) {
        return res.send({ card: created, message: "New card was created" })
    }





}