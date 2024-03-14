const mongoose = require('mongoose')

const UserInputSchema = new mongoose.Schema({
    Cafename: String,
    Rating: Number,
    Review: String
})

const UserReview = mongoose.model("reviews", UserInputSchema)
module.exports = UserReview