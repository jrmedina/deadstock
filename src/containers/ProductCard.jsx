import { IconButton, ImageListItem, ImageListItemBar } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { _id, url, title, size } = product;
  return (
    <ImageListItem className="image-list-container">
      <img src={url} srcSet={url} alt={title} loading="lazy" className="list-image"/>
      <ImageListItemBar
        title={title}
        subtitle={`Size: ${size}`}
        actionIcon={
          <Link to={`/product/${_id}`}>
            <IconButton
              sx={{ color: "rgba(255, 255, 255, 0.54)" }}
              aria-label={`info about ${title}`}
            >
              <InfoIcon />
            </IconButton>
          </Link>
        }
      />
    </ImageListItem>
  );
};

export default ProductCard;
