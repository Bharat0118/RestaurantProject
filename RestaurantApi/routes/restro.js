var express = require('express');
var restroDetails = require('../models/reg_model');
var cartDetails = require('../models/cart_model');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

const { signUp, forgetPass, changePass } = require('../controllers/authControl')
    // const sendgridTransport = require('nodemailer-sendgrid-transport');

require('dotenv').config()

// const transporter = nodemailer.createTransport(sendgridTransport({
//     auth: {
//         api_key: "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"
//     }
// }))

var route = express.Router();
route.use(bodyParser.json());

//Get User
route.get('/getUser', (req, res) => {
        restroDetails.find((err, result) => {
            if (err) {
                res.json(err)
            } else {
                res.json(result)
            }
        })
    })
    //Get User By Id
route.get('/getUsers/:id', (req, res) => {

    restroDetails.findById({ _id: req.params.id }, (err, result) => {
        if (err) {
            res.json({ "error": err })
        } else {
            res.json(result)
        }
    });

})

// Login authentication
route.post('/getByEmail', (req, res) => {
    let email = req.body.email;
    let password = req.body.password
    restroDetails.find({ email: email, password: password })
        .exec()
        .then(user => {
            if (user.length < 1) {
                res.status(404).json({
                    message: "Authentication Failed"
                })
            } else {
                var token = jwt.sign({
                    email: user[0].email,
                    userid: user[0]._id
                }, 'secret')
                res.status(201).json({
                    message: "Registeration Successfull",
                    user: user,
                    token: token
                })
            }
        })
        .catch(err => {
            res.json({ error: err })
        })
})

// Cart details
route.post('/cartDetails', (req, res) => {
    let cart = Object.create(cartDetails());

    cart._id = req.body.id;
    cart.user_id = req.body.user_id;
    cart.title = req.body.title;
    cart.price = parseFloat(req.body.amount);
    cart.quantity = parseInt(req.body.quantity)
    cart.image = req.body.image;
    cart.save().then((err, result) => {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})

// Get cart details
route.get('/getCart/:userID', (req, res) => {
    cartDetails.find({ user_id: req.params.userID }).then((err, result) => {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})

route.put('/updateQuantity/:id/:userID', (req, res) => {

    cartDetails.findOneAndUpdate({ $and: [{ _id: req.params.id }, { user_id: req.params.userID }] }, req.body).then((err, result) => {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})

//Delete items
route.delete('/delete/:id', (req, res) => {
    console.log("delted...", req.params.id);
    cartDetails.findByIdAndDelete({ _id: req.params.id }).then((err, result) => {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})

// profile update
route.put('/updateProfile/:id', (req, res) => {
    var id = req.params.id
    restroDetails.findOneAndUpdate({ _id: id }, req.body).then(resp => {
        res.status(200).json({
            message: "Profile Updated Successfully",
        })
    }).catch(err => {
        res.json({
            message: "user not Found",
            error: err
        })
    })
})


// Sign Up
route.post('/createUser', signUp)

// forget Password
route.get('/forgetPassword/:email', forgetPass)

// update password
route.put('/updatePassword/:id', changePass)






















// Login authentication
// route.get('/getByEmail/:email/:password', async(req, res) => {
//     try {
//         let data = await restroDetails.find({ $and: [{ email: req.params.email }, { password: req.params.password }] });
//         if (data.length !== 0) {
//             res.json(data)
//         } else {
//             res.json('err')
//         }
//     } catch (error) {
//         next(error)
//     }
// });

module.exports = route