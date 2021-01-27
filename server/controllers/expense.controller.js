const db = require('../models');
const Expense = db.expense;
const User = db.user;

exports.getExpenses = (req, res) => {
    const id = req.params.id;
    Expense.findAll({where: {userId: id}})
        .then(expenses => {
            res.status(200).send(expenses);
    }).catch(err => res.status(500).send({message: err.message}));
    /*User.findByPk(req.body.userId, {include: ['expenses']})
        .then(user => {
            if (!user) {
                return res.status(404).send({message: 'User not found.'});
            }
            res.status(200).send(user.expenses);
    }).catch(err => res.status(500).send({message: err.message}));*/
};

exports.getExpense = (req, res) => {
    const id = req.params.id;
    Expense.findByPk(id)
        .then(expense => {
            res.status(200).send(expense);
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

exports.updateExpense = (req, res) => {
    Expense.update(req.body, {where: {id: req.params.id}
    }).then(() => {
        res.send({message: 'Transaction was updated successfully!'});
    }).catch(err => res.status(500).send({message: err.message}));
}