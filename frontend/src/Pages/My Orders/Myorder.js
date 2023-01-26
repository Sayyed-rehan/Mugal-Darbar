import React from "react";
import axios from 'axios'
import swal from 'sweetalert'
import {Box,  Button, Card, CardActions, CardContent, CardMedia,  Stack, Typography, } from "@mui/material";
import { myFoodItems, myFoodItemsCount } from "../../utils/mylist";
import { currentUser } from "../../utils/currentuser";
import "./Myorder.css";
import Navbar from "../../Components/Navbar/Navbar";


const Myorder = () => {
 

  const handleRemove =(e)=>{
    
    console.log(e.target.value);
    myFoodItems.splice(e.target.value, 1);
    localStorage.setItem('list', JSON.stringify(myFoodItems))
    window.location.reload()

  }

    const handleOrder =async()=>{
      const responce = await axios.post("http://localhost:5000/orderFoodItems",{
        userId:currentUser._id,
        tableNumber:localStorage.getItem("tableNumber") ||1,
        items:myFoodItems
      })
      console.log(responce.data.data);
      localStorage.setItem('BookedOrders',JSON.stringify(myFoodItems))
      console.log(responce.data.success);
      if(responce.data.success === true){
        await swal ({
          title:"Order placed successfully",
          text:"Your are all set to Book your table",
          icon:"success"
        })
        localStorage.removeItem("list")
        window.location.reload()  
      }
    }

   
  

  return (
    <div>
      <Navbar title="My Orders" />

      <Typography variant="h3" sx={{textAlign:"center"}}>{myFoodItemsCount >0?
      <div className="my-orders-table">

        <Stack spacing={2} m="20px" justifyContent="center" alignItems="center">
          {myFoodItems.map((x,i) => (
            <Card sx={{ display: "flex", width: "600px", boxShadow: 12 }}>
              <CardMedia
                component="img"
                image={x.img}
                sx={{ width: 250, height: 200 }}
              />
              <Box>
                <CardContent>
                  <Typography variant="h4" gutterBottom>
                    {x.title}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Price : {x.price}/-
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Qty : {x.qty}🍴
                  </Typography>
                </CardContent>
              </Box>

             
      
              <Box display="flex" justifyContent="flex-start" alignItems="center">
              <CardActions>
                <Button variant="contained" size="samll" sx={{ bgcolor: "#1e88e5" }} onClick={handleRemove} value={i}>
                Remove</Button>
              </CardActions>
              </Box>
            </Card>
          ))}
        </Stack>
        <Button variant="contained" sx={{ml:"auto", mr:"auto", display:"block"}} onClick={handleOrder} color="success">
        Order
        </Button>
        
      
      </div>
      :"No Items Selected"}</Typography>

      

    </div>
  );
};

export default Myorder;
