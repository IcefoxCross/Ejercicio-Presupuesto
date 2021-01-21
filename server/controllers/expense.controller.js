const db = require('../models');
const Expense = db.expense;
const User = db.user;

exports.getExpenses = (req, res) => {
    User.findByPk(req.body.userId, {include: ['expenses']})
        .then(user => {
            if (!user) {
                return res.status(404).send({message: 'User not found.'});
            }
            res.status(200).send(user.expenses);
    }).catch(err => res.status(500).send({message: err.message}));
};

exports.createExpense = (req, res) => {
    Expense.create({
        concept: req.body.concept,
        amount: req.body.amount,
        date: req.body.date,
        type: req.body.type,
        userId: req.body.userId
    }).then(() => {
        res.send({message: 'Transaction was created successfully!'});
    }).catch(err => res.status(500).send({message: err.message}));
};