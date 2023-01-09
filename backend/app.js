
const PORT = process.env.PORT || 5000
const dotenv= require('dotenv');
const express = require('express');
const mongoose = require("mongoose")
const app = express();
dotenv.config();
const User = require("./models/userSchema")
const Food  = require("./models/foodSchema")

app.use(express.json())


//mongodb
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log('mongodb connected'))
.catch((err)=>console.log(err));


//api

//create
app.post("/sigin", async(req,res)=>{
    const{name, email, phone, password, role}= req.body
 
    const empltyFiled = [];
    if(!name) empltyFiled.push("name")
    if(!email) empltyFiled.push("email")
    if(!phone) empltyFiled.push("phone")
    if(!password) empltyFiled.push("password")
    if(!role) empltyFiled.push("role")

    if(empltyFiled.length>0){
        return res.json({
            success:false,
            mess:`${empltyFiled.join(' , ')} are required`
        })
    }

    const data = new User({
    name:name,
    email:email,
    phone:phone,
    password:password,
    role:role
    })
    await data.save()
    
    res.json({
        success:true,
        mess:"Added and Sigin succesfully",
        data:data
    })
})



//login user
app.post("/login", async(req,res)=>{

    const exitUser = await User.findOne({email:req.body.email, password:req.body.password})
    if(exitUser){
        res.json({success:true, mess:"logined succesfully" ,data:exitUser})
    }else{
        return res.json({success:false, mess:"invalid"})
    }
})


//create food items
app.post("/createfood", (req,res)=>{

    const{ title,desc,imgUrl,price,category} = req.body;
    const data =  new Food(req.body)
    data.save()

    res.json({
        success:true,
        mess:"food items Added",
        data:data
    })
})

//read food by  category
app.get("/getfood", async(req,res)=>{

    const {category} = req.query
    const data = await Food.find({category:{$regex: category, $options :'i'}})

    res.json({
        success:true,
        mess:"Food found",
        data:data
    })
})

//read food by  category
app.get("/getfoodbytitle", async(req,res)=>{

    const {title} = req.query
    const data = await Food.find({title:{$regex: title, $options: 'i'}})

    res.json({
        success:true,
        mess:"food found by title",
        data:data
    })
})


app.listen(5000, console.log(`Backend started at ${PORT}`));