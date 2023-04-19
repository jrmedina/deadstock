import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addFavorite, fetchProductDetails } from "../apiCalls";
import {
  removedSelectedProduct,
  selectedProduct,
} from "../redux/actions/productAction";
import MessageModal from "./MessageModal";

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
    const token = localStorage.getItem("token");


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
    if (productId && productId !== "") {
      fetchProductDetails(productId).then((response) =>
        dispatch(selectedProduct(response.data))
      );
    }

    return () => dispatch(removedSelectedProduct());
  }, [productId]);

  const handleTest = () => {
    console.log(product);
    
    addFavorite(token, product).then((res) => console.log(res));
  }
  return (
    <div className="product-details">
      <h1 className="product-title"> {title}</h1>
      <div className="product-container">
        <img className="product-image" src={url} alt={title} />
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
      <button onClick={handleTest}>Test</button>
      <MessageModal />
    </div>
  );
};

export default ProductDetails;
