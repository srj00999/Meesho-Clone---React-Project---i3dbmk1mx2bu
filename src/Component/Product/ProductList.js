import React, { useEffect, useContext } from "react";
import { DataAppContext } from "../AppData";
import { Link } from "react-router-dom";
import home from "../images/home.png";
import "../StyleComp/ProductList.css";
import SearchItem from './SearchItem';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import { faMoneyBillTransfer } from "@fortawesome/free-solid-svg-icons";
import { faRightLeft } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../Home/Navbar";


const ProductList = () => { 
  
  const localContext = useContext(DataAppContext);
  const { appState, setAppState } = localContext;

  useEffect(() => {
    setAppState({
      ...appState, showNav:false,
      showSearch:true,
      showProCart:true,
    })    
  }, []);

  return (
    <>
   <Navbar/>
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
          <div className="homeimagehide">
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
      <SearchItem  />
    </div>
    </>
  );
};

export default ProductList;
