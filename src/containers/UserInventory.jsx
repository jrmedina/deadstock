import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchInventory } from "../apiCalls";
import { removeCredentials, setUser } from "../redux/actions/userAction";

const UserInventory = () => {
  const user = useSelector((state) => state.user);
  const token = localStorage.getItem("token");
  const { username } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token && token !== null && username)
      fetchInventory(token).then((res) =>
        dispatch(setUser({ username: username, ...res.data }))
      );

    return () => dispatch(removeCredentials());
  }, [username, token]);

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

export default UserInventory;
