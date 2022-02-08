const express = require('express');
const app = express();

// Health Check endpoint - returns 200 HTTP status code
app.get('/healthz', (req,res) => {
    res.status(200).send();
})

const PORT = 5001;
app.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`))

module.exports = app;