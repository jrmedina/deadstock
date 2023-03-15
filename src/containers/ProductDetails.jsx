import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  removedSelectedProduct,
  selectedProduct,
} from "../redux/actions/productAction";

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

  const {
    title,
    price,
    size,
    release,
    code,
    brand,
    url,
    colors,
    user,
    quantity,
  } = product;

  const fetchProductDetails = async () => {
    const response = await axios
      .get(`http://localhost:3001/products/${productId}`)
      .catch((error) => console.log("Error: ", error));

    dispatch(selectedProduct(response.data));
  };

  useEffect(() => {
    if (productId && productId !== "") fetchProductDetails();
    return () => dispatch(removedSelectedProduct());
  }, [productId]);

  return (
    <div className="product-details">
      <img className="image" src={url} alt={title} />
      {title}
      <br />
      {brand} <br />
      <div className="details">
        <p>Color(s): {colors?.join(" / ")}</p>
        <p>Size: {size}</p>
        <p>Release Date: {release}</p>
        <p>Quantity: {quantity}</p>
        <p>Brand: {brand}</p>
        <p>SKU: {code}</p>
        <p>Seller: {user}</p>
        <p>Price: ${price} USD</p>
      </div>
    </div>
  );
};

export default ProductDetails;
