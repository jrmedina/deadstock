import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setCredentials, setUser } from "../redux/actions/userAction";

const LoginForm = () => {
  const credentials = useSelector((state) => state.credentials);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const setCreds = (e) => {
    const { placeholder, value } = e;
    dispatch(setCredentials({ [placeholder]: value }));
  };

  const fetchUser = async () => {
    console.log(credentials);

    const response = await axios
      .post(`http://localhost:3001/users/login`, {
        username: credentials.username,
        password: credentials.password,
      })
      .catch((error) => console.log("Error: ", error));
    dispatch(setUser({ username: credentials.username, ...response.data }));
  };

  return (
    <form className="Login">
      <h1>Log in</h1>
      <input
        className="username"
        type="username"
        placeholder="username"
        required
        onChange={(e) => setCreds(e.target)}
      />

      <input
        autoComplete="current-password"
        className="password"
        type="password"
        placeholder="password"
        required
        onChange={(e) => setCreds(e.target)}
      />
      <Link to={`/${credentials.username}/inventory`}>
      <button
        className="general-button"
        type="button"
        onClick={() => fetchUser()}
        //   disabled={!username || !password}
      >
        Log in
      </button>
      </Link>
      <p className="login-message">
        Visiting? <br />
        "username: dsUser password: shoes"
      </p>
    </form>
  );
};

export default LoginForm;
