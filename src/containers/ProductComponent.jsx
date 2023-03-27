import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { useDispatch } from "react-redux";
import { setProducts } from "../redux/actions/productAction";
import { fetchProducts } from "../apiCalls";
import LoadingWheel from "./LoadingWheel";

const ProductComponent = () => {
  const products = useSelector((state) => state.allProducts.products);
  const [search, setSearch] = useState([]);
  const [input, setInput] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts().then((response) => dispatch(setProducts(response.data)));
  }, []);

  const renderList = search.length
    ? search.map((product) => {
        const { _id, url, title, size } = product;
        return (
          <ImageListItem key={_id} className="image-list-container">
            <img src={url} srcSet={url} alt={title} loading="lazy" />
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
      })
    : products.map((product) => {
        const { _id, url, title, size } = product;
        return (
          <ImageListItem key={_id} className="image-list-container">
            <img src={url} srcSet={url} alt={title} loading="lazy" />
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

  const handleChange = (input) => {
    setInput(input);
    const normalizedInput = input.toLowerCase();
    const matchingResults = products.reduce((acc, product) => {
      const { title, brand, colors, size } = product;
      const matchesTitle = title.toLowerCase().includes(normalizedInput);
      const matchesBrand = brand.toLowerCase().includes(normalizedInput);
      const matchesSize = size.toString() === normalizedInput;
      const matchesColor = colors
        .join(", ")
        .toLowerCase()
        .includes(normalizedInput);
      const doesShoeMatchInput =
        matchesTitle || matchesBrand || matchesColor || matchesSize;
      if (doesShoeMatchInput) return [...acc, product];
      return acc;
    }, []);
    const resultsWithoutDuplicates = [...new Set(matchingResults)];
    input ? setSearch(resultsWithoutDuplicates) : setSearch([]);
  };

  const removeInput = () => {
    setInput("");
    setSearch([]);
  };

  if (products.length === 0) return <LoadingWheel />;
  return (
    <>
      <nav className="search-box">
        <input
          className="input"
          name="input"
          value={input}
          type="text"
          placeholder="search..."
          onChange={(e) => handleChange(e.target.value)}
        />
        {input && (
          <button className="clear-button" onClick={() => removeInput()}>
            x
          </button>
        )}
      </nav>
      <p className="list-title">
        {input ? `Results for "${input}"` : "All Products"}
      </p>
      <div className="list">{renderList}</div>
    </>
  );
};

export default ProductComponent;
