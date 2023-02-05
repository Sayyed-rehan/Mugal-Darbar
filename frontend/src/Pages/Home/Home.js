import React, { useEffect, useState } from "react";
import "../Home/Home.css";
import axios from "axios";
import FoodItemCard from "../../Components/FoodItemCard/FoodItemCard";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import loginUser from "../../utils/loginUser";
import Navbar from "../../Components/Navbar/Navbar";
import swal from "sweetalert";

const Home = () => {

  const [searchTextItems, setsearchTextItems] = useState("");
  const [allFoodItems, setallFoodItems] = useState([]);



  //logout
  const handleLogout = async () => {
    await swal({
      title: "Logout Successfully",
      icon: "success",
    });
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  };



  //all food items
  const fetchAllFoodItems = async () => {
    const responce = await axios.get("http://localhost:5000/allFoodItems");
    setallFoodItems(responce.data.data);
  };


  //sepficic food items 
  const fetchSpecificFoodItems = async () => {
    const responce = await axios.get(
      `http://localhost:5000/getfoodbytitle?title=${searchTextItems}`
    );
    console.log("spefific items", responce.data.data);
    setallFoodItems(responce.data.data);
  };



  useEffect(() => {
    if (searchTextItems.length > 0) {
      fetchSpecificFoodItems();
    } else {
      fetchAllFoodItems();
    }
  }, [searchTextItems]);

  useEffect(() => {
    loginUser();
  }, []);

  return (
    <div>
      <Navbar titleHome="Welcome to Mughal-Darbar" />

      <div className="home-search-bar">
        <TextField
          id="outlined-basic"
          label="Search your favorite Dishes here"
          variant="outlined"
          onChange={(e) => setsearchTextItems(e.target.value)}
          size="large"
          name="items"
          value={searchTextItems}
          fullWidth="true"
        />
      </div>
      <br />

      <div className="all-food-items">
        {allFoodItems?.map((x, i) => {
          return (
            <FoodItemCard
              category={x.category}
              desc={x.desc}
              imgUrl={x.imgUrl}
              price={x.price}
              title={x.title}
              key={i}
            />
          );
        })}
      </div>
      <div className="home-logout-button">
        <Button
          variant="contained"
          color="error"
          onClick={handleLogout}
          sx={{ ml: "45%" }}
          endIcon={<LogoutIcon />}
        >
          Logout
        </Button>
      </div>
      
    </div>
  );
};

export default Home;
