const mongoose = require("mongoose");


const orderSchema = mongoose.Schema({
    orderId:String,
    tableNumber:Number,
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    items:[{
        name:String,
        price:Number,
        quantity:Number
    }]

})

const Order = mongoose.model("Order", orderSchema)

module.exports = Order