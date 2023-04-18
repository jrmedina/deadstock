import React, { useState } from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { TextField } from "@mui/material";
export default function MessageModal() {
  const [open, setOpen] = useState(false);
  const product = useSelector((state) => state.product);

  const { contact, title, user } = product;
  const { register, handleSubmit } = useForm();

  const handleOpen = () => {
    setOpen(true);
  };

  const onSubmit = (formData) => {
    window.location.href = `mailto:${contact}?subject=${
      formData.subject || "DS Shoes"
    } ($${formData.dollar})&body=${formData.message}(${formData.email})`;
  };

  return (
    <>
      <Button variant="outlined" onClick={handleOpen}>
        Interested?<br></br> Let's send {user} an offer!
      </Button>
      <Modal
        aria-labelledby={`Offer for ${title}`}
        open={open}
        onClose={() => setOpen(false)}
        className="edit-modal"
      >
        <Sheet variant="outlined" className="message-modal">
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

          <div className="offer-form">
            <h3>Fill in the blanks for a drafted email!</h3>
            <TextField
              required
              {...register("subject")}
              className="offer-input"
              type="text"
              placeholder="Subject"
            />
            <TextField
              required
              {...register("name")}
              className="offer-input"
              type="text"
              placeholder="Name"
            />
            <TextField
              required
              {...register("email")}
              className="offer-input"
              type="email"
              placeholder="Your Email"
            />
            <TextField
              required
              {...register("dollar")}
              className="offer-input"
              placeholder="Dollar Amount"
              type="number"
            />
            <TextField
              required
              {...register("message")}
              placeholder="Message"
              multiline
              rows={3}
            />
          </div>

          <Button
            variant="solid"
            color="success"
            onClick={handleSubmit(onSubmit)}
            className="submit-button"
          >
            Submit
          </Button>
        </Sheet>
      </Modal>
    </>
  );
}
