const controller = require('../controllers/expense.controller');

module.exports = function(app) {

    app.post("/api/expense", controller.createExpense);

    app.get('/api/expense/:id', controller.getExpenses);
};