import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
// import "../Navbar/Navbar.css"
import { currentUser } from "../../utils/currentuser";
import LocalDiningTwoToneIcon from "@mui/icons-material/LocalDiningTwoTone";
import { myFoodItemsCount } from "../../utils/mylist";
import { useNavigate } from "react-router-dom";
import MosqueIcon from "@mui/icons-material/Mosque";

const Navbar = (props) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="navbar-appbar">
        <AppBar position="static" sx={{ mb: "10px", bgcolor: "#ec407a" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" sx={{ mr: 1 }}>
              <MosqueIcon sx={{ fontSize: 50 }} onClick={()=>navigate("/")}/>
            </IconButton>
            <Typography variant="h6"  component="div" sx={{ flexGrow: 1 }}>
              Mughal-Darbar
            </Typography>

            <Typography variant="h4" align = "center" sx={{ mr: "25%" }}>
              {props.title} {props.titleHome}
            </Typography>

            <Typography sx={{ m: "10px" }}>
              🥪 feeling hungry -{" "}
              {currentUser ? currentUser.name.split(" ")[1] : "guest"}😋
            </Typography>

            <Button
              color="inherit"
              variant="outlined"
              onClick={() => navigate("/Myorder")}
              startIcon={
                <LocalDiningTwoToneIcon fontSize="large" color="white" />
              }
            >
              {myFoodItemsCount}
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
};

export default Navbar;
