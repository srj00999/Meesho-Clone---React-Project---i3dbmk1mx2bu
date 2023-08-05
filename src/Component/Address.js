import React, { useContext, useEffect, useState } from "react";
import { DataAppContext } from "./AppData";
import "./CheckOut.css";
import "./Address.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPercent } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const Address = () => {
  const navigate = useNavigate();

  const [clss, setClass] = useState();
  const [paycart, setPaycart] = useState({
    totalPayprice:'',
    id:''
  });

  const localContext = useContext(DataAppContext);
  const { appState } = localContext;
  const { loginStatus, id, price, totalprice } = appState;
  const totalProductPrice = paycart.totalPayprice;
  const totaldiscount = (totalProductPrice/100)*18;
  

  useEffect(() => {
    setPaycart({
      ...paycart,
      totalPayprice:appState.price ||appState.totalprice,
      id:appState.id
    })
    if (!loginStatus) {
      navigate("/login");
    } else {
      console.log("Hello User");
    }
  }, []);

  console.log('final payment',paycart);

  const callClass = () => {
    setClass(true);
  };
  const cancelEdit = () => {
    setClass(false);
  };

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
                    <span className="pricetagfont">+{Number(totalProductPrice).toFixed(2)}</span>
                  </div>
                  <div className="priceProductContainer ">
                    <span className="totldiscount">Total Discounts</span>
                    <span className="totldiscountprice">-₹{Number(totaldiscount).toFixed(2)}</span>
                  </div>
                  <div className="hrlinepricecontainer"></div>
                  <div className="priceProductContainer">
                    <span className="orderttl">Order Total</span>
                    <span className="pricetagfont">₹{Number(totalProductPrice-totaldiscount).toFixed(2)}</span>
                  </div>
                  <div className="discountcontainer">
                    <span>
                      <FontAwesomeIcon icon={faPercent} />
                    </span>
                    <span className="pricetagfont">
                      
                      Yah! Your total discount is ₹{Number(totaldiscount).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      {clss && (
        <div className="slideEditContainer">
          <div className="slideEdit">
            <div className="AddrsContainer">
              <div className="add_address_cont">
                <span>ADD ADDRESS</span>
              </div>
              <form className="addAddressForm">
                <div className="contact_details_container">
                  <lablel>Contact Details</lablel>
                </div>
                <div>
                  <div>
                    <div className="frminput">
                      <label>
                        <span>Name</span>
                      </label>

                      <input />
                    </div>
                  </div>
                </div>
                {/* 



              <label>Name</label>
              <input className="formName" placeholder="Name"/>
              <input className="formcontact" placeholder="Contact Number"/>
              <label>Address</label>
              <input placeholder="House no /Building Name"/>
              <input placeholder="Road Name / Area / Colony"/>
              <input placeholder="Pincode"/>
              <div><input placeholder="City" /> <input placeholder="state"/></div>
              <input placeholder="Nearby Famous Place/Shop/School,etc (optional)"/>
              <button>Save Address and Continue</button> */}
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Address;
