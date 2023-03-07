import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setCredentials } from "../redux/actions/userAction";

const LoginForm = () => {
const credentials = useSelector(state => state.credentials)
const dispatch = useDispatch()


const setCreds = (e) => {
    const { placeholder, value } = e;
   dispatch(setCredentials({ [placeholder]: value }));
}

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
      <Link to={`/${credentials.username}/closet`}>
        <button
          className="general-button"
          type="button"
          //   onClick={() => login(username, password)}
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
