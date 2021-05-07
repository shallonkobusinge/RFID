const transactions = require('../controller/transaction.controller.js')
module.exports = (app) => {
    app.post('/api/create/transactions',transactions.createTransation);
    app.get('/api/read/transactions', transactions.getTransactions)
    app.delete('/api/transactions/delete/:id', transactions.deleteTransaction)
}