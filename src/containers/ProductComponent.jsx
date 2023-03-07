import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProductComponent = () => {
  const products = useSelector((state) => state.allProducts.products);

  const renderList = products.map((product) => {
    const { id, title, url, size } = product;
    return (
      <div className="product-listing" key={id}>
        <Link to={`/product/${id}`}>
          <div className="card">
            <img className="image" src={url} alt={title} />
            <h2>{title}</h2>
            <p>{size}</p>
          </div>
        </Link>
      </div>
    );
  });

  return <>{renderList}</>;
};

export default ProductComponent;
