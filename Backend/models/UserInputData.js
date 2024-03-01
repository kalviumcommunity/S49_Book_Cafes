const mongoose = require('mongoose')

const UserInputSchema = new mongoose.Schema({
    name: String,
    email: String,
    favBook: String
})

const UserInputModel = mongoose.model("userData", UserInputSchema)
module.exports = UserInputModel