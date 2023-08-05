import React, { useContext, useEffect, useState } from "react";
import { DataAppContext } from "./AppData";
import "./CheckOut.css";
import "./Address.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPercent } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const Address = () => {
  const navigate = useNavigate();

  const[clss, setClass]= useState();
  const localContext = useContext(DataAppContext);
  const { appState } = localContext;
  const { loginStatus } = appState;

  useEffect(() => {
    if (!loginStatus) {
      navigate("/login");
    } else {
      console.log("Hello User");
    }
  }, []);

const callClass =()=>{
  setClass(slideEdit)
}


  return (
    <div>
      <div className="checkout_page">
        <div className="checkoutmaincont">
          <div className="paymentContainer">
            <div className="paymentmethod">
              <span className="selcectmethod">Select Payment Method</span>
              <span className="addnewContaienr">
                <button onClick={callClass}> + ADD NEW ADDRESS</button>
              </span>
            </div>
            <div>
              <div className="address_container">
                <div className="nameconatiner">
                  <h2>Suraj Yadav</h2>
                  <button className="editbtncntainer">Edit</button>
                </div>
                <div className="main_address_container">
                  <p>114/60 Vidhi Aashram</p>
                  <p>vinayakpur</p>
                  <p>Kanpur </p>
                  <p>Uttar Pradesh 208025</p>
                  <p>+919125300999</p>
                </div>
                <div className="deliver_btn_container">
                  <Link to="/checkout">
                    <button>Deliver to this Address</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="prcedetailpage">
              <div className="pricesubcontainer">
                <div className="pcontainer">
                  <div className="pricedetailcontainerbox">Price Details</div>
                  <div className="priceProductContainer">
                    <span className="totalprdprice">Total Product Price</span>
                    <span className="pricetagfont">+₹311</span>
                  </div>
                  <div className="priceProductContainer ">
                    <span className="totldiscount">Total Discounts</span>
                    <span className="totldiscountprice">-₹18</span>
                  </div>
                  <div className="hrlinepricecontainer"></div>
                  <div className="priceProductContainer">
                    <span className="orderttl">Order Total</span>
                    <span className="pricetagfont">₹311</span>
                  </div>
                  <div className="discountcontainer">
                    <span>
                      <FontAwesomeIcon icon={faPercent} />
                    </span>
                    <span className="pricetagfont">
                      {" "}
                      Yah! Your total discount is ₹18
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="slideEditContainer">
        <div className="slideEdit"></div>
      </div>
    </div>
  );
};

export default Address;
