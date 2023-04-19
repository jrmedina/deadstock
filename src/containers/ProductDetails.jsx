import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addFavorite, deleteFavorite, fetchProductDetails } from "../apiCalls";
import {
  removedSelectedProduct,
  selectedProduct,
} from "../redux/actions/productAction";
import MessageModal from "./MessageModal";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { updateUser } from "../redux/actions/userAction";
const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const currentUser = useSelector((state) => state.user);
  const token = localStorage.getItem("token");
  const [favorited, setFavorited] = useState(false);

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
    _id,
    quantity,
  } = product;

  useEffect(() => {
    if (productId && productId !== "") {
      fetchProductDetails(productId).then((response) =>
        dispatch(selectedProduct(response.data))
      );
    }
    if (currentUser.favorites.some((fav) => fav?._id === productId)) {
      console.log(true);

      setFavorited(true);
    }

    return () => dispatch(removedSelectedProduct());
  }, [productId]);

  const handleTest = () => {
    console.log(1111, currentUser);
    
    setFavorited(favorited ? false : true);
    if (!favorited) {

    addFavorite(token, product).then((res) => dispatch(updateUser(res.data)));
    } else {
      deleteFavorite(token, product).then((res) => dispatch(updateUser(res.data)))
    }

    console.log(2222, currentUser);
    
  };
  return (
    <div className="product-details">
      <h1 className="product-title"> {title}</h1>
      <div className="product-container">
        <FavoriteIcon
          onClick={handleTest}
          sx={{ color: favorited ? "red" : "gray" }}
        />
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
      <MessageModal />
    </div>
  );
};

export default ProductDetails;
