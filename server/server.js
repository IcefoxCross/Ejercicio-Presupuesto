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

/// prod
// db.sequelize.sync();
/// dev
db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and resync DB');
}).catch(err => console.log(err));

// Routes
app.get('/', (req,res) => {
    res.json('Welcome to the JWT app');
});

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

// Server Init
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});