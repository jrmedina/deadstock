import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { authenticateRequest } from "../apiCalls";

const LoginForm = () => {
   const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [creds, setCreds] = useState({});
  const [error, setError] = useState();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCreds({ ...creds, [id]: value });
  };

  const login = () => {
    authenticateRequest(creds.username, creds.password).then((res) => {
      if (res.message) {
        setError(res.message);
        setCreds({})
      } else {
        localStorage.setItem("token", res.data.accessToken);
        history.push(`/${creds.username}/inventory`);
      }
    });
  };

  return (
    <form className="login-container">
      <h3>Log in</h3>
      <FormControl sx={{ s: 1, width: "25ch" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
        <OutlinedInput
          id="username"
          type="text"
          endAdornment={<InputAdornment position="end"></InputAdornment>}
          label="Username"
          onChange={handleChange}
        />
      </FormControl>
      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
          id="password"
          onChange={handleChange}
      
        />
      </FormControl>
      <Button variant="outlined" onClick={login}>
        Login
      </Button>
      <p className="error">{error}</p>
      <p className="login-message">
        Visiting? <br />
        username: dsUser | password: shoes
      </p>
    </form>
  );
};

export default LoginForm;
