import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductDetails } from "../apiCalls";
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

  useEffect(() => {
    if (productId && productId !== "")
      fetchProductDetails(productId).then((response) =>
        dispatch(selectedProduct(response.data))
      );
    return () => dispatch(removedSelectedProduct());
  }, [productId]);

  return (
    <div className="product-details">
      <img className="product-image" src={url} alt={title} />
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
        <p>Price: ${price?.toFixed(2)} USD</p>
      </div>
    </div>
  );
};

export default ProductDetails;
