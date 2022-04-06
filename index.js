const express = require('express');
const app = express();
const db = require("./models");
const router = require('./routes/user.routes.js');
require('dotenv').config();
var statsDClient = require('statsd-client')
var sdc = new statsDClient({host: 'localhost', port: 8125, debug: true});
const morgan = require('morgan');

// Syncing the DB using Sequelize
db.sequelize.sync()
.then((
    console.log("DB sync done!")
));

//Middlewear
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('common'));

// Health Check endpoint - returns 200 HTTP status code 
app.get('/health', (req,res) => {
    sdc.increment('/health');
    console.log("hit /health");
    res.status(200).send();
})

// Router
app.use('/v1/user', router);

const PORT = 5001;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`))

module.exports = app;