import React from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { FormControl, TextField } from "@mui/material";
import { fetchProductDetails, updateProductDetails } from "../apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { removedSelectedProduct, selectedProduct } from "../redux/actions/productAction";

export default function EditModal() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

  const [open, setOpen] = React.useState(false);
  //     const handleChange = (e) => {
  //       const { id, value } = e.target;
  //       if (id === "size" || id === "quantity" || id === "price") {
  //         setProd({ ...prod, [id]: Number(value) });
  //       } else {
  //         setProd({ ...prod, [id]: value });
  //       }
  //     };

  // const handleOpen = () => {

  // }

  const submitChanges = () => {
    updateProductDetails(product._id, prod).then((res) => console.log(res));
  };

  const handleOpen = () => {
    setOpen(true);
      dispatch(selectedProduct(details));
      return () => dispatch(removedSelectedProduct());
  };

  return (
    <>
      <Button variant="outlined" color="neutral" onClick={handleOpen}>
        Edit
      </Button>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ModalClose
            variant="outlined"
            sx={{
              top: "calc(-1/4 * var(--IconButton-size))",
              right: "calc(-1/4 * var(--IconButton-size))",
              boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
              borderRadius: "50%",
              bgcolor: "background.body",
            }}
          />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            Editting... <br />
            {product.title}
          </Typography>
          <img className="card-image" src={product.url} alt={product.title} />
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <TextField
              required
              id="title"
              label={product.title}
              variant="standard"
              onChange={(e) => handleChange(e)}
            />
            <TextField
              required
              id="size"
              label={product.size}
              variant="standard"
              onChange={(e) => handleChange(e)}
            />
            <TextField
              required
              id="quantity"
              label={product.quantity}
              variant="standard"
              onChange={(e) => handleChange(e)}
            />
            <TextField
              required
              id="price"
              label={product.price}
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
