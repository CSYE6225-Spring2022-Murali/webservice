const express = require('express');
const app = express();
const db = require("./models");
const router = require('./routes/user.routes.js');
require('dotenv').config();

// Syncing the DB using Sequelize
db.sequelize.sync()
.then((
    console.log("DB sync done!")
));

// Health Check endpoint - returns 200 HTTP status code
app.get('/healthz', (req,res) => {
    res.status(200).send();
})

//Middlewear
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// Router
app.use('/v1/user', router);

const PORT = 5001;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`))

module.exports = app;