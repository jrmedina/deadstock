import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  removedSelectedProduct,
  selectedProduct,
} from "../../redux/actions/productAction";

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
      .get(`http://localhost:3001/api/inventory/${productId}`)
      .catch((error) => console.log("Error: ", error));
    dispatch(selectedProduct(response.data));
  };
  
  useEffect(() => {
    if (productId && productId !== "") fetchProductDetails();
    return () => dispatch(removedSelectedProduct());
  }, [productId]);

  return (
    <div className="product-details">
      <img src={url} alt={title} />
      {title}
      <br />
      {brand} <br />
      {price} <br />
      {colors} <br />
      {quantity} <br />
      {user} <br />
      {code} <br />
      {release} <br />
      {size}
    </div>
  );
};

export default ProductDetails;
