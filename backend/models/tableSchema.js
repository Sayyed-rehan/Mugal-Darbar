const mongoose = require("mongoose");


const tableSchema = new mongoose.Schema({
    tableNumber:Number,
    occupied:Boolean,
    occupiedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})


const Table = mongoose.model("Table", tableSchema)

module.exports = Table;