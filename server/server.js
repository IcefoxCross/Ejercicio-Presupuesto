const express = require('express');
const cors = require('cors');

const app = express();

const corsOptions = {
    origin: 'http://localhost:8081'
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());

// DB
const db = require('./models');

const bcrypt = require('bcryptjs');
const User = db.user;
const Expense = db.expense;

/// prod
db.sequelize.sync();
/// dev
/*db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and resync DB');
    initialize();
}).catch(err => console.log(err));*/

function initialize() {
    User.create({
        username: "user1",
        email: "user@mail.com",
        password: bcrypt.hashSync("123456", 8)
    });
    User.create({
        username: "user2",
        email: "user@email.com",
        password: bcrypt.hashSync("123456", 8)
    }).then(user => {
        Expense.create({
            concept: "food",
            amount: 100,
            date: new Date(),
            type: "expense",
            userId: user.id
        });
    });
}

// Routes
app.get('/', (req,res) => {
    res.json('Welcome to the JWT app');
});

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/expense.routes')(app);

// Server Init
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});