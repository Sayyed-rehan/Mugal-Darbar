
const dotenv= require('dotenv');
const express = require('express');
const mongoose = require("mongoose")
const app = express();
const PORT = process.env.PORT || 5000
dotenv.config();

app.use(express.json())


//mongodb
mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log('mongodb connected'))
.catch((err)=>console.log(err));


//api

//api


app.listen(5000, console.log(`Backend started at ${PORT}`));