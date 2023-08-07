import React, { useEffect, useState, useContext } from "react";
import "./ProductList.css";
import "./SearchItem.css";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { DataAppContext } from "./AppData";

const SearchItem = () => {
  const localContext = useContext(DataAppContext);
  const { appState } = localContext;
  const { search } = appState;
  const [defaultapi, setDefault] = useState([]);
  const [filterdata, setfilterData] = useState([]);

  const ProductAPI = async () => {
    const res = await fetch(
      "https://content.newtonschool.co/v1/pr/63b6c911af4f30335b4b3b89/products/"
    );
    const productlistdata = await res.json();
    setDefault(productlistdata);

    if (search === "") {
      setfilterData(productlistdata);
    } else {
      const filterResult = productlistdata.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.category.toLowerCase().includes(search.toLowerCase())
      );
      setfilterData(filterResult);
    }
  };

  const sortAccending = () => {
    const originaldata = [...filterdata];
    const sortdata = originaldata.sort((a, b) => a.price - b.price);
    console.log(sortdata);
    setfilterData(sortdata);
  };

  const sortDccending = () => {
    const originaldata = [...filterdata];
    const sortdata = originaldata.sort((a, b) => b.price - a.price);
    console.log(sortdata);
    setfilterData(sortdata);
  };

  const sortRating = () => {
    const originaldata = [...filterdata];
    const sortdata = originaldata.sort((a, b) => b.rating.rate - a.rating.rate);
    console.log(sortdata);
    setfilterData(sortdata);
  };

  const sortRelevance = () => {
    setfilterData(defaultapi);
  };

  useEffect(() => {
    ProductAPI();
  }, [search]);

  return (
    <div className="homepagemaincontainer">
      <div>
        {filterdata && filterdata.length > 0 && filterdata != undefined ? (
          <div className="homepagesubmainContainer">
            <div className="productlistcontainer">
              <div className="productlistSubcontainer">
                <div className="filtercontainer">
                  <div className="sortcontainer sortitm">Sort Items</div>
                  <div className="Categorycontainer">
                    <div
                      onClick={sortDccending}
                      className="sortitemscontainers"
                    >
                      <button>Price (High to Low)</button>
                    </div>
                    <div
                      onClick={sortAccending}
                      className="sortitemscontainers"
                    >
                      <button>Price (Low to High)</button>
                    </div>
                    <div onClick={sortRating} className="sortitemscontainers">
                      <button>Rating</button>
                    </div>
                    <div
                      onClick={sortRelevance}
                      className="sortitemscontainers"
                    >
                      <button>More Products..</button>
                    </div>
                  </div>
                </div>
                <div className="prdmainConainer">
                  {filterdata.map((item) => (
                    <div className="prdBox">
                      <Link to={`/pdetails/${item.id}`}>
                        <div className="imgContainer">
                          <img src={item.image} alt="image" className="imgg" />
                        </div>
                      </Link>
                      <div className="pdTitleContainer">{item.title}</div>
                      <div className="priceContainer">₹{item.price}</div>
                      <div className="freeContainer">
                        <span>Free Delivery</span>
                      </div>
                      <div className="reivewContainer">
                        <span className="ratingconainer">
                          {item.rating.rate}
                          <FontAwesomeIcon icon={faStar} className="star" />
                        </span>
                        <span className="leftItmeconainer">
                          Left Item {item.rating.count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="noitemFound">
            <div className="oppscontainer">
              <h1>Oops! No results found</h1>
              <h4>Don’t worry, try searching for something else</h4>
            </div>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default SearchItem;
