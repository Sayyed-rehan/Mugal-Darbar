import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import "../Sigin/Sigin.css";
import { Button, Stack } from "@mui/material";
import axios from "axios";
import importedimgs from "../../Images/1.png"
import { currentUser } from "../../utils/currentuser";







const Sigin = () => {
  const [user, setuser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "User",
  });

  //redirect to home page if already logined
  useEffect(()=>{
    
    // const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    if(currentUser){
     
      window.location.href="/"
    }
  },[]) 

  const handleInput = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSigin = () => {
    const responce = axios.post("http://localhost:5000/sigin", {
      name: user.name,
      phone: user.phone,
      email: user.email,
      password: user.password,
      role: user.role,
    });
    console.log(responce.data);
    alert("sigined");
    window.location.href = "/login";
  };

  const handleAlreadyAccount=()=>{
    window.location.href="/login"
  }

  return (
    <div>
      <h1 align="center">SIGN-IN</h1>
      <div className="images">
        {/* <h1 align="center">Sign-In</h1> */}
        <img src={importedimgs} alt="images" width={"600px"} />
      </div>
    <div className="cards">
      <div className="inputs">
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          size="small"
          name="name"
          fullWidth={true}
          value={user.name}
          onChange={handleInput}
        />
        <br />
        <br />

        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          size="small"
          name="email"
          fullWidth={true}
          value={user.email}
          onChange={handleInput}
        />
        <br />
        <br />
        <TextField
          id="outlined-basic"
          label="Phone"
          variant="outlined"
          size="small"
          name="phone"
          type={"phone"}
          fullWidth={true}
          value={user.phone}
          onChange={handleInput}
        />
        <br />
        <br />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          size="small"
          name="password"
          type={"password"}
          fullWidth={true}
          value={user.password}
          onChange={handleInput}
          helperText='Please do not Share your Password'
        />
        <br />
        <br />
        <div className="buttons">

        <Stack>

          <Button variant="contained" onClick={handleSigin} >Sign-In</Button>
          <br />
          <Button variant="contained"  color='success' onClick={handleAlreadyAccount}>Have an Account</Button>
        </Stack>
          
        
        </div>
        </div>
      </div>
    </div>
  );
};

export default Sigin;
