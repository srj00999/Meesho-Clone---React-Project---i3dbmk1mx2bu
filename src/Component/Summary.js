import React, { useEffect , useContext, useState} from 'react';
import { DataAppContext } from './AppData';
import './Summary.css';
import "./CheckOut.css";
import "./Address.css";
import "./Cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPercent } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import { faWallet } from "@fortawesome/free-solid-svg-icons";

const Summary = () => {

    const [cart, setCart] = useState();
    const localContext = useContext(DataAppContext);
    const {appState, setAppState } = localContext;
    const { paymentType, deliveryAdd, discount, totalprice , } = appState;


    //Save order in localStorage
    useEffect(()=>{  
      const cartData = JSON.parse(localStorage.getItem("cart")) || []; 
      localStorage.setItem("orderproduct", JSON.stringify(cartData));
      const orderpd = JSON.parse(localStorage.getItem("orderproduct")) || [];
      setCart(orderpd);
      localStorage.setItem("cart", JSON.stringify([]));
      setAppState({
        ...appState, pquantity:0
      })
    },[])

  
  return (

    <div className='summaryPage'>
        <div className='confirmorder'>
          <div className='checkiconcotainer'>
            <span><FontAwesomeIcon icon={faCheck} /></span>
          </div>
          <div className='idcontainer'>
            <h1>Thank you for Shopping with us!</h1>
            <p>ID #601433291940</p>
          </div>
       </div>  
       <div className="checkout_page">
        <div className="checkoutmaincont">
          <div className="summarypayment">
            <div className='estimatedelvry'>
              <span><FontAwesomeIcon icon={faTruck} /></span>
              <span>Estimated Delivery by Wednesday, 30th Aug</span>
            </div>
            { cart && cart.map((item)=>(
              <div className="product_container">
              <div className="product_img_des_cont">
                <div className="product_image_container">
               <span className="cartImageContainer">
                      <img
                        src={item.image}
                        width="60px"
                        height="60"
                      />
                    </span>
                </div>
                <div className="product_description_cont">
                  <div className="descrp_remove_cont">
                    <div className="descrp_container">
                      <div className="ovrflowhide">
                        <h4 className="title_para">{item.title}</h4>
                      </div>
                      <span>₹{item.price}</span>
                      <span>All Return</span>
                      <div className="showQuantity">
                        <span>{item.rating.rate}</span>
                        <span>
                          <span>Qty:</span>
                          <span>{item.qty}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="free_delivery_container">
                <span className="paraContainer">
                  <p className="paraStyle">Free Delivery</p>
                </span>
              </div>
            </div>
            ))
            }
             <div className="paymentmethod">
              <span className="summarydelivery">
              <span><FontAwesomeIcon icon={faLocationDot} /></span>
                <span>Delivery Address</span>
              </span>
            </div>
              <div>
                <div className="address_container">
                  <div className="nameconatiner">
                    <h2 >{deliveryAdd.name}</h2>
                  </div>
                  <div className="main_address_container">
                    <p>{deliveryAdd.house}</p>
                    <p>{deliveryAdd.area}</p>
                    <p>{deliveryAdd.optional}</p>
                    <p>{deliveryAdd.city}</p>
                    <p>
                      {deliveryAdd.state} {deliveryAdd.pincode}
                    </p>
                    <p>{deliveryAdd.contactno}</p> 
                  </div>    
                </div>
              </div>
            <div className='paytype'>Payment Mode</div>
           <div className='paymentmode'>
            <span> <FontAwesomeIcon icon={faWallet} /></span>
            <span>{paymentType}</span>
            </div>  
          </div>
          <div>
            <div className="prcedetailpage">
              <div className="pricesubcontainer">
                <div className="pcontainer">
                  <div className="pricedetailcontainerbox">Price Details</div>
                  <div className="priceProductContainer">
                    <span className="totalprdprice">Total Product Price</span>
                    <span className="pricetagfont">
                      +{Number(totalprice).toFixed(2)}
                      </span>
                  </div>
                  <div className="priceProductContainer ">
                    <span className="totldiscount">Total Discounts</span>
                    <span className="totldiscountprice">
                      -₹{Number(discount).toFixed(2)}
                      67
                    </span>
                  </div>
                  <div className="hrlinepricecontainer"></div>
                  <div className="priceProductContainer">
                    <span className="orderttl">Order Total</span>
                    <span className="pricetagfont">
                      ₹{Number(totalprice - discount).toFixed(2)}       
                    </span>
                  </div>
                  <div className="discountcontainer">
                    <span>
                      <FontAwesomeIcon icon={faPercent} />
                    </span>
                    <span className="pricetagfont">
                      Yah! Your total discount is ₹
                      {Number(discount).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Summary