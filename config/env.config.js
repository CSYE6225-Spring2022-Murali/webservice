const dotenv = require('dotenv');

dotenv.config({
    path: __dirname + '/config.env'
})
console.log("Environment variables loaded")

module.exports = dotenv