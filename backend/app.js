
const PORT = process.env.PORT || 5000
const dotenv= require('dotenv');
const express = require('express');
const mongoose = require("mongoose")
const app = express();
dotenv.config();
const cors = require("cors")
const User = require("./models/userSchema")
const Food  = require("./models/foodSchema")
const Table = require("./models/tableSchema")
const Order = require("./models/orderSchema")
const path  = require('path')
const _dirname = path.resolve()

app.use(express.json())
app.use(cors())


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

//read all food items
app.get("/allFoodItems", async(req,res)=>{

    const data = await Food.find()
    res.json({
        success:true,
        mess:"all food items found",
        data:data
    })
})

//read all food items by id
app.get("/getFoodItemsById", async(req,res)=>{
    const {_id} = req.query
    const data =await Food.findOne({_id:_id})
    res.json({
        success:true,
        mess:"items found by id",
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

//read food by  title
app.get("/getfoodbytitle", async(req,res)=>{

    const {title} = req.query
    const data = await Food.find({title:{$regex: title, $options: 'i'}})

    res.json({
        success:true,
        mess:"food found by title",
        data:data
    })
})


//create table
app.post("/creatTable", async(req,res)=>{

    const exitTable =await Table.findOne({tableNumber:req.body.tableNumber})

    const data = new Table({
        tableNumber:req.body.tableNumber,
        occupied:false,
    })

    if(exitTable){
        res.json({
            success:false,
            mess:"table already exits"
        })
    }else{
        data.save()
        res.json({
            success:true,
            mess:"table created",
            data:data
        })
    }
});


//book table
app.post("/booktable", async(req,res)=>{

    const { tableNumber, userId } = req.body;

    const existingTable = await Table.findOne({ tableNumber: tableNumber });
    if (existingTable && existingTable.occupied) {
        return res.json({
            success: false,
            message: "Table already occupied"
        })
    }

    if(existingTable){
        existingTable.occupied = true;
        existingTable.occupiedBy = userId;
        await existingTable.save();
    }

    res.json({
        success: true,
        message: "Table booked successfully",
        data: existingTable
    })
});



//unbook table
app.post("/unbooktable", async(req,res)=>{
   
    const {tableNumber} = req.body;
    const exitingTable = await Table.findOne({tableNumber:tableNumber});

    if(exitingTable){
        exitingTable.occupied= false,
        exitingTable.occupiedBy = null,
        await exitingTable.save()
    }
    res.json({
        success: true,
        message: "Table unbooked successfully",
        data: exitingTable
    })
})


//get available table
app.get("/availabletable", async(req,res)=>{

    const availabletable = await Table.find()

    res.json({
        success:true,
        mess:"founded available tables",
        data:availabletable
    })
})


//order food items
app.post("/orderFoodItems", async(req,res)=>{

    const{userId, tableNumber,items} = req.body;

    const totalOrders = await Order.countDocuments();
    const orderId = totalOrders+1;

    const data = new Order({
        orderId,
        tableNumber,
        userId,
        items
    });
    data.save()
    res.json({
        success:true,
        mess:"order placed",
        data:data
    })
});

//get orders by orderId
app.get("/orderById", async(req,res)=>{

    const {orderId} = req.query;

  const order = await Order.findOne({orderId: orderId});

    res.json({
        success: true,
        message: "Order fetched successfully",
        data: order
    })
});


//orders by userId
app.get("/orderByUserId", async(req,res)=>{

    const{userId} = req.query;
    const data = await Order.find({userId:userId})
    res.json({
        success:true,
        mess:"orders by userID",
        data:data
    })
})


app.use(express.static(path.join(_dirname, "..", "frontend", "build")));

app.get("*", (req,res)=>{
    res.sendFile(path.join(_dirname, "..", "frontend", "build", "index.html"))
})


app.listen(5000, console.log(`Backend started at ${PORT}`));