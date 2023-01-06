
const PORT = process.env.PORT || 5000
const dotenv= require('dotenv');
const express = require('express');
const mongoose = require("mongoose")
const app = express();
dotenv.config();
const User = require("./models/userSchema")

app.use(express.json())


//mongodb
mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log('mongodb connected'))
.catch((err)=>console.log(err));


//api
//create
app.post("/sigin", async(req,res)=>{
 
    const empltyFiled = [];
    if(!req.body.name) empltyFiled.push("name")
    if(!req.body.email) empltyFiled.push("email")
    if(!req.body.phone) empltyFiled.push("phone")
    if(!req.body.password) empltyFiled.push("password")
    if(!req.body.role) empltyFiled.push("role")

    if(empltyFiled.length>0){
        return res.json({
            success:false,
            mess:`${empltyFiled.join(' , ')} are required`
        })
    }

    const data = new User({
    name:req.body.name,
    email:req.body.email,
    phone:req.body.phone,
    password:req.body.password,
    role:req.body.role
    })
    await data.save()
    
    res.json({
        success:true,
        mess:"Added",
        data:data
    })
})


app.post("/login", async(req,res)=>{

    const exitUser = await User.findOne({email:req.body.email, password:req.body.password})
    if(exitUser){
        res.json({success:true, mess:"logined" ,data:exitUser})
    }else{
        return res.json({success:false, mess:"invalid"})
    }


})
//api


app.listen(5000, console.log(`Backend started at ${PORT}`));