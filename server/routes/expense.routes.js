const controller = require('../controllers/expense.controller');

module.exports = function(app) {

    app.post("/api/expense", controller.createExpense);

    app.get('/api/expenses/:id', controller.getExpenses);

    app.get('/api/expense/:id', controller.getExpense);

    app.put('/api/expense/:id', controller.updateExpense);

    app.delete('/api/expense/:id', controller.deleteExpense);
};