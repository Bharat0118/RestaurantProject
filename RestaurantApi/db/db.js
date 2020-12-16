var mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect('mongodb://localhost:27017/Restro', {
    // useUnifiedTopology: true,
    useNewUrlParser: true,
    // useFindAndModify: false
}).then(() => {
    console.log("Conection Successfull......");
}).catch((err) => {
    console.log(err);
})

// var db = mongoose.connection;

// db.once('open', () => {
//     console.log('User Database is connected');
// })