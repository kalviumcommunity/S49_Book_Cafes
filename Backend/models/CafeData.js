const mongoose = require('mongoose')

const CafeSchema = new mongoose.Schema({
    id: Number,
    cafeName: String,
    loc: String,
    type: String,
    ratings: String,
})

const CafeModel = mongoose.model("details", CafeSchema)
module.exports = CafeModel