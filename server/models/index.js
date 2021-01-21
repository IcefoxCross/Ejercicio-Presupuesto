const config = require('../config/db.config');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    config.DB, config.USER, config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorAliases: false,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../models/User')(sequelize, Sequelize);
db.expense = require('../models/Expense')(sequelize, Sequelize);

db.user.hasMany(db.expense, {as: 'expenses'});
db.expense.belongsTo(db.user, {
    foreignKey: 'userId',
    as: 'user'
});

module.exports = db;