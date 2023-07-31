import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import home from "../images/home.png";
import "./ProductList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import { faMoneyBillTransfer } from "@fortawesome/free-solid-svg-icons";
import { faRightLeft } from "@fortawesome/free-solid-svg-icons";

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
    <>
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

      <div className="productpage">
        <div className="productcontainer">
          <div className="row1">
            {data.map((item) => (
              <div className="each_product">
                <Link to={`/pdetails/${item.id}`} className="view_product">
                  <img src={item.image} className="img" />

                  <p className="title1">{item.title}</p>
                  <p className="price1"> ₹ {item.price} </p>
                  <div className="rating1">
                    <p className="rate">{item.rating.rate}</p>
                    <p className="ratecc">{item.rating.count} Reviews </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
