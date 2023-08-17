import React, { useEffect, useState, } from "react";
import { Link } from "react-router-dom";
import home from "../images/home.png";
import "./ProductList.css";
import Footer from './Footer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import { faMoneyBillTransfer } from "@fortawesome/free-solid-svg-icons";
import { faRightLeft } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
const ProductList = () => {
  const [data, setData] = useState([]);

  const ProductAPI = async () => {
    const res = await fetch(
      "https://content.newtonschool.co/v1/pr/63b6c911af4f30335b4b3b89/products/"
    );
    const productlistdata = await res.json();

    setData(productlistdata);
  };

  useEffect(() => {
    ProductAPI();
  }, []);

  return (
    <div className="homepagemaincontainer">
      <div className="homepagesubmainContainer"></div>
      <div className="addcontent">
        <div className="addcontentitem">
          <div className="addtitlecontainer">
            <div className="addheading">
              <h1>
                Lowest Prices
                <br /> Best Quality Shopping
              </h1>
            </div>
            <div className="row3container">
              <div className="row2container">
                <div className="iconsContainer">
                  <div className="iconsname">
                    <span className="iconscolom">
                      <FontAwesomeIcon icon={faTruck} />
                    </span>
                    <span>
                      Free
                      <br /> Delivery
                    </span>
                  </div>
                  <div className="iconsname">
                    <span className="iconscolom">
                      <FontAwesomeIcon icon={faMoneyBillTransfer} />
                    </span>
                    <span>
                      Cash on
                      <br /> Delivery
                    </span>
                  </div>
                  <div className="iconsname">
                    <span className="iconscolom">
                      <FontAwesomeIcon icon={faRightLeft} />
                    </span>
                    <span>
                      Easy
                      <br /> Return
                    </span>
                  </div>
                </div>
                <div className="btndownloadmessho">
                  <Link to="https://play.google.com/store/apps/details?id=com.meesho.supply&hl=en_IN&gl=US">
                    <button>Download the Messho App</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div>
            <img src={home} />
          </div>
        </div>
      </div>
      <div className="topcatContainer">
        <div className="topcatsubContainer">
          <hr />
          <div className="topheading">
            <h1>Top Categories to choose from</h1>
          </div>
          <hr />
        </div>
      </div>
      <div className="productlistcontainer">
        <div className="productlistSubcontainer">
         
        <div className="filtercontainer">
                <div className="sortcontainer sortitm">Sort Items</div>
                <div className="Categorycontainer">
                  <div className="sortitemscontainers"><button>Price (High to Low)</button></div>
                  <div className="sortitemscontainers"><button>Price (Low to High)</button></div>
                  <div  className="sortitemscontainers"><button>Rating</button></div>
                  <div  className="sortitemscontainers"><button>More Items..</button></div>
                </div>
              </div>
          <div className="prdmainConainer">
            {data.map((item) => (
              <div className="prdBox">
                <Link to={`/pdetails/${item.id}`}>
                <div className="imgContainer">
                  <img src={item.image} alt="image" className="imgg" />
                </div></Link>
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
      <Footer/>
    </div>
  );
};

export default ProductList;
