import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import "./Login.css";
import loginimg from "../../Images/login1.jpg";
import TextField from "@mui/material/TextField";
import { Button, Stack } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [user, setuser] = useState({
    email: "",
    password: "",
  });

  //redirect to home page if already logined
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      navigate("/");
    }
  }, []);

  const handleInput = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };

  //login
  const handleLogin = async () => {
    const responce = await axios.post("http://localhost:5000/login", {
      email: user.email,
      password: user.password,
    });
    console.log(responce.data.mess);
    if (responce.data.success) {
      await swal({
        title: "Logined",
        text: responce.data.mess,
        icon: "success",
        button: "Ready to Go",
      });
      localStorage.setItem("currentUser", JSON.stringify(responce.data.data));
      setuser({ email: "", password: "" });
      window.location.href = "/";
    } else {
      await swal({
        title: "Invalid",
        text: responce.data.mess,
        icon: "error",
        button: "Ok",
      });
      localStorage.removeItem("currentUser");
      setuser({ email: "", password: "" });
    }
  };

  //need to register
  const handleNeedAccount = () => {
    navigate("/sigin");
  };

  return (
    <div>
      <div className="login-header">
        <h1>Login</h1>
      </div>

      <div className="login-img">
        <img src={loginimg} alt="login" height={"300px"} />
      </div>
      <div className="login-inputs">
        <div className="login-inputs-header">
          
          <PersonIcon color="primary" fontSize="large" />
        </div>

        <TextField
          id="filled-basic"
          required
          label="Email"
          variant="filled"
          size="small"
          placeholder="Please Enter your Email"
          type={"email"}
          name="email"
          value={user.email}
          onChange={handleInput}
          fullWidth="true"
        />

        <br />

        <TextField
          id="filled-basic"
          required
          label="Password"
          variant="filled"
          size="small"
          placeholder="Please Enter your Password"
          type={"password"}
          name="password"
          value={user.password}
          onChange={handleInput}
          fullWidth="true"
        />

        <div className="login-buttons">
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="success"
              onClick={handleLogin}
              endIcon={<LoginIcon />}
            >
              Login
            </Button>

            <Button
              onClick={handleNeedAccount}
              variant="text"
              sx={{ p: "10px" }}
              color="info"
            >
              Need account
            </Button>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default Login;
