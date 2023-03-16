import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUser } from "../apiCalls";
import { removeCredentials, setUser } from "../redux/actions/userAction";

const Closet = () => {
  const user = useSelector((state) => state.user);
  const creds = useSelector((state) => state.credentials);
  const { username } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (username && username !== "")
      fetchUser(creds.username, creds.password).then((response) =>
        dispatch(setUser({ username: creds.username, ...response.data }))
      );
    return () => dispatch(removeCredentials());
  }, [username]);

  // if (!user.inventory) return <p>Loading...</p>;

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
