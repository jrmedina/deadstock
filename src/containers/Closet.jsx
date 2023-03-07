import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { removeCredentials, setUser } from "../redux/actions/userAction";

const Closet = () => {
  // const user = useSelector((state) => console.log(state.user));
  const credentials = useSelector((state) => state.credentials);
  const { username } = useParams();
  const dispatch = useDispatch();

  const fetchUser = async () => {
    const response = await axios
      .post(`http://localhost:3001/api/${username}/closet`, {
        username: credentials.username,
        password: credentials.password,
      })
      .catch((error) => console.log("Error: ", error));

    dispatch(setUser(response.data));
  };

  useEffect(() => {
    if (username && username !== "") fetchUser();
    return () => dispatch(removeCredentials);
  }, [username]);

  return <div>Login</div>;
};

export default Closet;
