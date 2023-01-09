const mongoose  = require("mongoose")

const foodSchema = new mongoose.Schema({
    title:String,
    desc:String,
    imgUrl:String,
    price:Number,
    category:String
})

const Food = mongoose.model("Food", foodSchema)

module.exports = Food;