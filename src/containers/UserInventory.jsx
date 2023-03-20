import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchInventory } from "../apiCalls";
import { setUser } from "../redux/actions/userAction";
import EditModal from "./EditModal";

import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { FormControl, TextField } from "@mui/material";
import { fetchProductDetails, updateProductDetails } from "../apiCalls";
import {
  removedSelectedProduct,
  selectedProduct,
} from "../redux/actions/productAction";

const UserInventory = () => {
  const user = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);

  const token = localStorage.getItem("token");
  const { username } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (token && token !== null && username)
      fetchInventory(token).then((res) =>
        dispatch(setUser({ username: username, ...res.data }))
      );
  }, [username, token]);

  const submitChanges = () => {
    updateProductDetails(product._id, prod).then((res) => console.log(res));
  };

  const renderList = user.inventory?.map((product) => {
    const { _id, title, url, size} = product;
    return (
        <div className="card" key={_id}>
          <div className="card-details">
            <p>{title}</p>
            <p>{size}</p>
          </div>
          <img className="card-image" src={url} alt={title} />
          <EditModal product={product} />
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
