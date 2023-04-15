import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { myFoodItems, myFoodItemsCount } from "../../utils/mylist";
import { currentUser } from "../../utils/currentuser";
import "./Myorder.css";
import Navbar from "../../Components/Navbar/Navbar";
import { styled } from "@mui/material/styles";




const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Myorder = () => {
  const [bill, setbill] = useState(0);

  useEffect((i) => {
    let x = 0;
    myFoodItems.map((a) => {
      x = x + a.price * a.qty;
      setbill(x);
    });
  }, []);

  console.log(bill);

  //to remove items from the cart
  const handleRemove = (e) => {
    console.log(e.target.value);
    myFoodItems.splice(e.target.value, 1);
    localStorage.setItem("list", JSON.stringify(myFoodItems));
    window.location.reload();
  };

  // to place order
  const handleOrder = async () => {
    const responce = await axios.post("http://localhost:5000/orderFoodItems", {
      userId: currentUser._id,
      tableNumber: localStorage.getItem("tableNumber") || 1,
      items: myFoodItems,
    });
    console.log(responce.data.data);
    localStorage.setItem("BookedOrders", JSON.stringify(myFoodItems));
    console.log(responce.data.success);
    if (responce.data.success === true) {
      await swal({
        title: "Order placed successfully",
        text: "Your are all set to Book your table",
        icon: "success",
      });
      localStorage.setItem("Bill", JSON.stringify(myFoodItems));
      localStorage.removeItem("list");
      window.location.href = "/booktable";
    }
  };

  return (
    <div>
      <Navbar title="My Orders" />

      <Typography variant="h3" sx={{ textAlign: "center" }}>
        {myFoodItemsCount > 0 ? (
          <div className="my-orders-table">
            <Stack
              spacing={2}
              m="20px"
              justifyContent="center"
              alignItems="center"
            >
              {myFoodItems.map((x, i) => (
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
                      <Typography variant="h6" gutterBottom>
                        Bill : ₹{x.price * x.qty}/-
                      </Typography>
                    </CardContent>
                  </Box>

                  <Box
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="center"
                  >
                    <CardActions>
                      <Button
                        variant="contained"
                        size="samll"
                        sx={{ bgcolor: "#1e88e5" }}
                        onClick={handleRemove}
                        value={i}
                      >
                        Remove
                      </Button>
                    </CardActions>
                  </Box>
                </Card>
              ))}
            </Stack>
            <Stack
              sx={{ display: "block", ml: "auto", mr: "auto", pb: "10px" }}
              width="400px"
            >
              <Item sx={{ boxShadow: 15, backgroundColor: "#5c6bc0" }}>
                {/* <Typography variant="h5" color="#eeeeee">
                  Your total bill is : ₹ {bill}/-
                </Typography> */}
              </Item>
            </Stack>
            <Button
              variant="contained"
              sx={{ ml: "auto", mr: "auto", display: "block", mb: "10px" }}
              onClick={handleOrder}
              color="success"
            >
              Order
            </Button>
          </div>
        ) : (
          "No Items Selected"
        )}
      </Typography>
    </div>
  );
};

export default Myorder;
