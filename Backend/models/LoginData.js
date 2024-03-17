const mongoose = require('mongoose')

const LoginData = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
})

const LoginModel = mongoose.model("logindetails", LoginData)
module.exports = LoginModel