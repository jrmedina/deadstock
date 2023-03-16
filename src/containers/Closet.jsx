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
      <div className="card" key={_id}>
        <div className="card-details">
          <p>{title}</p>
          <p>{size}</p>
        </div>
        <img className="card-image" src={url} alt={title} />
      </div>
    );
  });

  return <div className="closet">{renderList}</div>;
};

export default Closet;
