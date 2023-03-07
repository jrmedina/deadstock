import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../redux/actions/productAction";

const ProductListing = () => {
  const products = useSelector((state) => state);
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    const response = await axios
      .get(`http://localhost:3001/api/inventory`)
      .catch((error) => {
        console.log("Error: ", error);
      });
    dispatch(setProducts(response.data.data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return <div>ProductListing</div>;
};

export default ProductListing;
