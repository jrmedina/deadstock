import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { useDispatch } from "react-redux";
import { setProducts } from "../redux/actions/productAction";
import { fetchProducts } from "../apiCalls";

const ProductComponent = () => {
  const products = useSelector((state) => state.allProducts.products);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts().then((response) => dispatch(setProducts(response.data)));
  }, []);

  const renderList = products.map((product) => {
    const { _id, url, title, size } = product;
    return (
      <ImageListItem key={_id}>
        <img
          src={url}
          srcSet={url}
          alt={title}
          loading="lazy"
          cols={product.cols || 1}
          rows={product.rows || 1}
        />
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
  });

  return (
    <>
    <p>All Products</p>
      <ImageList className="list" cols={4}>
        {renderList}
      </ImageList>
    </>
  );
};

export default ProductComponent;
