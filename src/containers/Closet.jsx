import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { removeCredentials, setUser } from "../redux/actions/userAction";

const Closet = () => {
  const user = useSelector((state) => state.user);
  const credentials = useSelector((state) => state.credentials);
  const { username } = useParams();
  const dispatch = useDispatch();

  const fetchUser = async () => {
    const response = await axios
      .post(`http://localhost:3001/users/login`, {
        username: credentials.username,
        password: credentials.password,
      })
      .catch((error) => console.log("Error: ", error));

    dispatch(setUser({ username: credentials.username, ...response.data }));
  };

  useEffect(() => {
    if (username && username !== "") fetchUser();
    return () => dispatch(removeCredentials());
  }, [username]);

  if (!user.inventory) return <p>Loading...</p>;

  const renderList = user.inventory?.map((product) => {
    const { _id, title, url, size } = product;
    return (
      <div className="product-listing" key={_id}>
        <div className="card">
          <img className="image" src={url} alt={title} />
          <h2>{title}</h2>
          <p>{size}</p>
        </div>
      </div>
    );
  });

  return <div>{renderList}</div>;
};

export default Closet;
