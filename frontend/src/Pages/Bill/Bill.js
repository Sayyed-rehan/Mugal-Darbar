import { React, useEffect, useState } from "react";
import axios from "axios";
import { myBill } from "../../utils/Bills";
import { tableNo } from "../../utils/TableBooked";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import "./Bill.css";
import Navbar from "../../Components/Navbar/Navbar";
import swal from "sweetalert";

const Bill = () => {
  const [bill, setbill] = useState(0);
  const [items, setitems] = useState(0);

  //total bill calulation
  useEffect((i) => {
    let x = 0;
    let y = 0;
    myBill.map((a, i) => {
      x = x + a.price * a.qty;
      setbill(x);
      y = y + i;
      setitems(y);
    });
  }, []);

  //Payment and unbook table
  const Unbook = async () => {
    const res = await axios.post("http://localhost:5000/unbooktable", {
      tableNumber: tableNo,
    });
    console.log(res.data);
    await swal({
      title: "Payment Successfull",
      text: "Thanks for coming please visit again",
      icon: "success",
      button: "Go",
    });
    window.location.reload();
    localStorage.setItem("Bill", JSON.stringify([]));
    localStorage.setItem("tableBooked", JSON.stringify(0));
    localStorage.removeItem("BookedOrders");
    window.location.href = "/";
  };

  return (
    <div>
      <Navbar billing="Billing" />

      <div className="bill-header">
        <Typography variant="h5" sx={{ p: "10px" }}>
          Table No. - {tableNo}
          <img
            src="https://cdn-icons-png.flaticon.com/512/1889/1889949.png"
            width="50px"
            hspace="15"
            alt="table No."
          />
        </Typography>

        <Typography variant="h5" sx={{ p: "10px" }}>
          Bill - ₹ {bill}/-
          <img
            src="https://cdn-icons-png.flaticon.com/512/1052/1052866.png"
            width="40px"
            vspace="-5"
            hspace="5"
            alt="bill cash"
          />
        </Typography>

        <Typography variant="h5" sx={{ p: "10px" }}>
          Items - {items + 1}
          <img
            src="https://cdn-icons-png.flaticon.com/512/4290/4290854.png"
            width="35px"
            hspace="5"
            alt="items"
          />
        </Typography>
      </div>

      <div className="bill-card">
        <Stack
          spacing={2}
          direction="row"
          sx={{ p: "10px" }}
          className="bill-stack"
        >
          {myBill.map((x, i) => (
            <Card
              sx={{ display: "flex", boxShadow: "15" }}
              className="bill-card"
            >
              <CardMedia
                component="img"
                image={x.img}
                sx={{ width: 250, height: 200 }}
              />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      p: "10px",
                    }}
                  >
                    <Typography variant="h5">🍴{x.title}🍸</Typography>
                    <Typography variant="h6">₹ {x.price}/-</Typography>
                    <Typography variant="h6">🛒{x.qty}</Typography>
                  </Box>
                </CardContent>
              </Box>
            </Card>
          ))}
        </Stack>
      </div>

      <div className="bill-button">
        <Button variant="contained" onClick={Unbook} color="success">
          Proceed to Payment
        </Button>
      </div>
    </div>
  );
};

export default Bill;
