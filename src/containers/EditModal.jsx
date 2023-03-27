import React, { useState } from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";
import { FormControl, TextField } from "@mui/material";
import { fetchProductDetails, updateProductDetails } from "../apiCalls";
import { useDispatch, useSelector } from "react-redux";
import {
  removedSelectedProduct,
  selectedProduct,
  updateSelectedProduct,
} from "../redux/actions/productAction";
import { setUser } from "../redux/actions/userAction";

export default function EditModal({ id }) {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const user = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (value === "") return;
    if (id === "size" || id === "quantity" || id === "price") {
      dispatch(updateSelectedProduct({ ...product, [id]: Number(value) }));
    } else {
      dispatch(updateSelectedProduct({ ...product, [id]: value }));
    }
  };

  const handleOpen = () => {
    setOpen(true);
    fetchProductDetails(id).then((response) =>
      dispatch(selectedProduct(response.data))
    );
  };

  const submitChanges = () => {
    updateProductDetails(product._id, product).then((res) => {
      console.log(res.data);
      
      const updatedInv = [...user.inventory];
      const idx = updatedInv.findIndex((item) => item._id === res.data._id);
      idx !== -1 && updatedInv.splice(idx, 1, res.data);
      dispatch(setUser({ ...user, inventory: updatedInv }));
    });
    setOpen(false);
    return () => dispatch(removedSelectedProduct());
  };

  return (
    <>
      <Button variant="outlined" onClick={handleOpen}>
        Edit
      </Button>
      <Modal
        aria-labelledby={`Editting ${product.title}`}
        open={open}
        onClose={() => setOpen(false)}
        className="edit-modal"
      >
        <Sheet variant="outlined" className="sheet">
          <ModalClose
            variant="outlined"
            sx={{
              top: "calc(-1/4 * var(--IconButton-size))",
              right: "calc(-1/4 * var(--IconButton-size))",
              boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
              borderRadius: "50%",
              bgcolor: "background.body",
            }}
            onClick={() => dispatch(removedSelectedProduct())}
          />
          <h2 className="modal-title">
            Editting. . . <br />
            {product.title}
          </h2>
          <img className="card-image" src={product.url} alt={product.title} />
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <TextField
              required
              id="title"
              label={`Title: ${product.title}`}
              variant="standard"
              onChange={(e) => handleChange(e)}
            />
            <TextField
              required
              id="size"
              label={`Size: ${product.size}`}
              variant="standard"
              onChange={(e) => handleChange(e)}
            />
            <TextField
              required
              id="quantity"
              label={`Quantity: ${product.quantity}`}
              variant="standard"
              onChange={(e) => handleChange(e)}
            />
            <TextField
              required
              id="price"
              label={`Price: ${product.price?.toFixed(2)}`}
              variant="standard"
              onChange={(e) => handleChange(e)}
            />
          </FormControl>

          <Button variant="solid" color="success" onClick={submitChanges}>
            Submit
          </Button>
        </Sheet>
      </Modal>
    </>
  );
}
