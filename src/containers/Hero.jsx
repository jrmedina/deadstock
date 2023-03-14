import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setProducts } from "../redux/actions/productAction";
      import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";


const Hero = () => {
  const recent = useSelector((state) => state.allProducts.products)
    .slice(-5)
    .reverse();
  const [slide, setSlide] = useState(0);
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    const response = await axios
      .get(`http://localhost:3001/products`)
      .catch((error) => {
        console.log("Error: ", error);
      });
    dispatch(setProducts(response.data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const carouselList = recent.map((product, index) => {
    const { _id, title, url, size } = product;
    return (
      <div key={index} className={index === slide ? "slide active" : "slide"}>
        {index === slide && (
          <div className="MiniPost">
            <Link to={`/inventory/${_id}`}>
              <img src={url} className="mini-image" alt={title} />
            </Link>
            <h3 className="title">{title}</h3>
            <h4 className="mini-size">Size: {size}</h4>
          </div>
        )}
      </div>
    );
  });

  const handleSlide = (e) => {
    e.target.id === "left"
      ? setSlide(slide === recent.length - 1 ? 0 : slide + 1)
      : setSlide(slide === 0 ? recent.length - 1 : slide - 1);
  };

  return (
    <div className="recent">
      <h2 className="added">recently added:</h2>
      <div className="slider">
        <button
          aria-label="left"
          className="left slide-btn"
          id="left"
          onClick={handleSlide}
        >
          <ArrowBackIosIcon />
        </button>
        <button
          aria-label="right"
          className="right slide-btn"
          id="right"
          onClick={handleSlide}
        >
          <ArrowForwardIosIcon />
        </button>
        {carouselList}
      </div>
    </div>
  );
};

export default Hero;
