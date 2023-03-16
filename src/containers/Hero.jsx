import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setProducts } from "../redux/actions/productAction";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import LinearProgress from "@mui/material/LinearProgress";
import { fetchProducts } from "../apiCalls";

const Hero = () => {
  const recent = useSelector((state) => state.allProducts.products)
    .slice(-5)
    .reverse();
  const [slide, setSlide] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
   fetchProducts().then(response => dispatch(setProducts(response.data)));
  }, []);

  const carouselList = recent.map((product, index) => {
    const { _id, title, url } = product;
    return (
      <div key={index} className={index === slide ? "slide active" : "slide"}>
        {index === slide && (
          <div className="hero-post">
            <Link to={`/product/${_id}`}>
              <img src={url} className="hero-image" alt={title} />
            </Link>
            <h3>{title}</h3>
          </div>
        )}
      </div>
    );
  });

  const handleSlide = (e) => {
    if (e.target.id === "left") {
      setSlide(slide === recent.length - 1 ? 0 : slide + 1);
    } else {
      setSlide(slide === 0 ? recent.length - 1 : slide - 1);
    }
  };

  return (
    <div className="trending">
      <div className="trending-title">
        <p>trending now:</p>
        <LinearProgress sx={{ width: "220px" }} color="success" />
      </div>
      <div className="slider">
        <ArrowBackIosIcon
          aria-label="left"
          className="left slide-btn"
          id="left"
          onClick={handleSlide}
        />
        <ArrowForwardIosIcon
          aria-label="right"
          className="right slide-btn"
          id="right"
          onClick={handleSlide}
        />
        {carouselList}
      </div>
    </div>
  );
};

export default Hero;
