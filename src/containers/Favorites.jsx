import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";

const Favorites = () => {
  const user = useSelector((state) => state.user);

  const renderList = user.favorites.map(fav => <ProductCard product={fav} key={fav.Id}/>)

  return <div className="list">{renderList}</div>;
};

export default Favorites;
