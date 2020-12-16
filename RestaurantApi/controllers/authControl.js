var nodemailer = require('nodemailer');
var restroDetails = require('../models/reg_model');

require('dotenv').config

exports.signUp = (req, res) => {
    let restroUser = Object.create(restroDetails());
    restroUser.fname = req.body.fname,
        restroUser.lname = req.body.lname,
        restroUser.email = req.body.email,
        restroUser.password = req.body.password,
        restroUser.phone = parseInt(req.body.phone),
        restroUser.address = req.body.address,
        restroUser.address1 = req.body.address1,
        restroUser.state = req.body.state;
    restroUser.pin = req.body.pin;

    restroDetails.findOne({ email: req.body.email }).exec((err, user) => {
        if (user) {
            console.log("Denied!!");
            return res.status(400).json({ error: "Email has Already Register" })
        } else {
            sendMail(restroUser.email, info => {
                console.log('The mail has been send');
                restroUser.save((err, result) => {
                    if (err) {
                        res.status(400).json(err)
                    } else {
                        res.json(result)
                    }
                })

            })
        }

    })
};

async function sendMail(user, callback) {
    console.log(process.env.EMAIL_USER);
    let transpoter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: `${process.env.userEmail}`,
            pass: `${process.env.userPass}`
        }
    });
    let mailOptions = {
        from: '"KhaO-KhilaO Restaurant"',
        to: user,
        subject: "Registration Successfull✌ || Welcome to KhaO-KhilaO Restaurant",
        html: `<h1>Welcome to KhaO-KhilaO Restaurant</h1><br>
               <h2>Thank You For Registering</h2>`
    };
    let info = await transpoter.sendMail(mailOptions);
    callback(info)
}

//Forget password
exports.forgetPass = (req, res) => {
    let email = req.params.email;
    console.log(email);
    restroDetails.findOne({ email: email }).exec()
        .then(user => {
            console.log(user.length);
            if (user.length === null) {
                console.log("Access");
                res.status(404).json({
                    message: "Authentication Failed"
                })
            } else {
                res.json(user)
            }
        })
        .catch(err => {
            res.json({ error: err })
        })
}

//Change password
exports.changePass = (req, res) => {
    var id = req.params.id
    console.log(req.body.password);
    restroDetails.findOneAndUpdate({ _id: id }, req.body)
        .then(resp => {
            res.status(200).json({
                message: "Password changed",
            })
        })
        .catch(err => {
            res.json({
                message: "user not Found",
                error: err
            })
        })
}