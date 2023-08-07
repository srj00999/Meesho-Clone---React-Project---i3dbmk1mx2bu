import React, { useState } from "react";
import "./CheckOut.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faPercent } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";

const CheckOut = () => {
  const [reselling, setReselling] = useState();
  return (
    <div className="checkout_page">
      <div className="checkoutmaincont">
        <div className="paymentContainer">
          <div className="paymentmethod">
            <span className="selcectmethod">Select Payment Method</span>
            <span className="selcectmethod_payment">
              100% SAFE
              <br />
              PAYMENTS
            </span>
          </div>
          <div className="payincash">
            <div>PAY IN CASH</div>
            <div className="horizontalline"></div>
          </div>
          <div className="paymentmethod">
            <form>
              <select className="formcontainer">
                <option>Cash on Delivery</option>
                <option>Pay cash on delivery</option>
                <FontAwesomeIcon icon={faCircleCheck} />
              </select>
            </form>
          </div>
          <div className="reselling_container">
            <div className="reselling_order">
              <span>
                <h2>Reselling the Order?</h2>
              </span>
              <span className="clickon">
                <p>click on 'Yes' to add Final Price</p>
              </span>
            </div>
            <div>
              <span className="resellingbtn">
                <button onClick={() => setReselling(false)}>No</button>
                <button onClick={() => setReselling(true)}>Yes</button>
              </span>
              <span></span>
            </div>
          </div>
          {reselling && (
            <div className="cashtobeContainer">
              <div className="cashtobecollected">Cash to Collected</div>
              <div>
                <input
                  placeholder="Order Total (₹1053) + Your Margin"
                  className="inputboxcontnr"
                />
              </div>
              <div className="marginbox">Your Margin: ₹0</div>
            </div>
          )}
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
              <div className="moneydeduct">
                <div className="moneydeduct anymoney">
                  clicking on 'Continue' will not deduct any money
                </div>
                <div className="placedordercontainer">
                  <Link to="summary">
                    <button>Placed order</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
