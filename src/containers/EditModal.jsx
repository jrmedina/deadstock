import * as React from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { FormControl, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";

export default function EditModal({product}) {
    const {title} = product

  const [open, setOpen] = React.useState(false);

   const [prod, setProd] = React.useState(product);

const handleChange = (e) => {
    const { id, value } = e.target;
    setProd({ ...prod, [id]: value });
}

const submitChanges = () => {
    
}

  return (
    <React.Fragment>
      <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
        Edit
      </Button>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        // className="edit-form"
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
            Editting {title}
          </Typography>
          <img className="card-image" src={prod.url} alt={prod.title} />
          {/* <Typography
            id="modal-desc"
            textColor="text.tertiary"
            className="edit-form"
          ></Typography> */}
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <TextField
              required
              id="title"
              label={prod.title}
              variant="standard"
              onChange={(e) => handleChange(e)}
            />
            <TextField
              required
              id="size"
              label={prod.size}
              variant="standard"
              onChange={(e) => handleChange(e)}
            />
            <TextField
              required
              id="quantity"
              label={prod.quantity}
              variant="standard"
              onChange={(e) => handleChange(e)}
            />
            <TextField
              required
              id="price"
              label={prod.price}
              variant="standard"
              onChange={(e) => handleChange(e)}
            />
          </FormControl>
          <Button variant="solid" color="success" onClick={submitChanges}>
            Submit
          </Button>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
