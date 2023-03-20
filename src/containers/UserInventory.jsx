import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchInventory } from "../apiCalls";
import { setUser } from "../redux/actions/userAction";
import EditModal from "./EditModal";

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
        {/* <button id={_id} onClick={e => editProduct(e.target.id)}>
          EDIT
        </button> */}
        <EditModal product={product}/>
      </div>
    );
  });
















  

  return !user.inventory ? (
    "Loading..."
  ) : (
    <div className="inventory-container">
      <p className="greeting">
        {username}'s inventory ({user.inventory.length})
      </p>
      <div className="user-inventory">{renderList}</div>
    </div>
  );
};

export default UserInventory;
