const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')

var Schema = mongoose.Schema

let restroDetails = new Schema({

    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email Id is not valid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: [4, 'Password must be atleast 4 characters long....']
    },
    state: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: "Address can't be empty"
    },
    address1: {
        type: String
    },
    phone: {
        type: Number,
        required: "Phone can't be empty"
    },
    pin: {
        type: String,
        required: "pin can't be empty"
    },
    saltSecret: String
}, { collection: "restro-user" })

//Events
// restroDetails.pre('save', async function(next) {
//     try {
//         const salt = await bcrypt.genSalt(10)
//         const hash = await bcrypt.hash(this.password, salt)
//         this.password = hash;
//         this.saltSecret = salt;
//         next()
//     } catch (error) {
//         next(error);
//     }

// })


module.exports = mongoose.model("restroDetails", restroDetails)