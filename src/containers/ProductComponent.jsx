import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProductComponent = () => {
  const products = useSelector((state) => state.allProducts.products);


  const renderList = products.map((product) => {
    const { _id, title, url, size } = product;
    return (
      <div className="product-listing" key={_id}>
        <Link to={`/product/${_id}`}>
          <div className="card">
            <img className="image" src={url} alt={title} />
            <p>{title}</p>
            <p>Size: {size}</p>
          </div>
        </Link>
      </div>
    );
  });

  return <>{renderList}</>;
};

export default ProductComponent;
