const transactions = require('../controller/transaction.controller.js')
const card = require('../controller/card.controller.js')
module.exports = (app) => {
    app.post('/api/create/transactions',transactions.createTransation);
    app.get('/api/read/transactions', transactions.getTransactions)
    app.post('/api/create/card', card.createCard)
}