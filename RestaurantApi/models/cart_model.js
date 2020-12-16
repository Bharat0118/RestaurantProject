const mongoose = require('mongoose');
var Schema = mongoose.Schema

let cartDetails = new Schema({

    _id: {
        type: String,
    },
    user_id: {
        type: String
    },
    title: {
        type: String,
    },
    image: {
        type: String
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number
    }

}, { collection: "Cart-details" })

module.exports = mongoose.model("cartDetails", cartDetails)