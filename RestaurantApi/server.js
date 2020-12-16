var express = require('express');
var cors = require('cors')
var restro = require('./routes/restro');
var port = process.env.PORT || 8080
require('dotenv')
require('./db/db')

// const port = 8080
var app = express();
app.use(cors())
app.use('/restro', restro);

app.listen(port, () => {
    console.log(`App is Listening at ${port}`);
})