import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setCredentials } from "../redux/actions/userAction";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const LoginForm = () => {
  const credentials = useSelector((state) => state.credentials);
  const dispatch = useDispatch();
  console.log(credentials);

  const setCreds = (e) => {
    const { id, value } = e.target;
    console.log(id);

    dispatch(setCredentials({ [id]: value }));
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <form className="login-container">
      <h1>Log in</h1>

      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
        <OutlinedInput
          // id="outlined-adornment-username"
          id="username"
          type="text"
          endAdornment={<InputAdornment position="end"></InputAdornment>}
          label="Username"
          onChange={setCreds}
        />
      </FormControl>
      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          // id="outlined-adornment-password"
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
          onChange={setCreds}
        />
      </FormControl>

      <Link to={`/${credentials.username}/inventory`}>
     
       <Button variant="outlined">Login</Button>
       
      </Link>

      <p className="login-message">
        Visiting? <br />
        "username: dsUser password: shoes"
      </p>
    </form>
  );
};

export default LoginForm;
