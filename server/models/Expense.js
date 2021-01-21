module.exports = (sequelize, Sequelize) => {
    const Expense = sequelize.define('expenses', {
        concept: {type: Sequelize.STRING},
        amount: {type: Sequelize.FLOAT},
        date: {type: Sequelize.DATE},
        type: {type: Sequelize.STRING}
    });

    return Expense;
};