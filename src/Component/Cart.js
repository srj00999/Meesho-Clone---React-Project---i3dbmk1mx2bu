import React, { useEffect, useState, useContext } from "react";
import { DataAppContext } from "./AppData";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import cartImage from "../images/cartImage.png";
import cartprice from "../images/cartprice.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState();
  // const [cartstatus , setcartStatus] = useState(true);
  const localContext = useContext(DataAppContext);
  const { appState, setAppState } = localContext;
  const { loginStatus, pquantity, totalprice, emptyCartStatus , price } = appState;

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartData);

    if (!loginStatus) {
      navigate("/login");
    } else {
      console.log("Hello User");
    }
  }, []);

  const updateCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
    setCart(cart);
    let tempPrice = 0;
    cart.map((cartitem) => {
      tempPrice = tempPrice + cartitem.price;
    });
    let crtstatuss = true;
    if (tempPrice === 0) {
      crtstatuss = false;
    }
    setAppState({
      ...appState,
      pquantity: cart.length,
      totalprice: tempPrice,
      emptyCartStatus: crtstatuss,
    });
  };

  const removItemFn = (index, e) => {
    e.preventDefault();
    const newCart = [...cart];
    newCart.splice(index, 1);
    updateCart(newCart);
  };

  const updatePaymentfn =()=>{
    setAppState({
      ...appState,price:'', id:''
    })
    navigate('/address')
  }
  return (
    <>
    <div className="cart_page">
      {emptyCartStatus  ? (
        <div className="cart_main_container">
          <div className="product_side_container">
            <div className="cart_item_container">
              <div className="item_container">
                <span className="h3_container">
                  <h3 className="h3element">Cart</h3>
                </span>
                <span className="count_item">Item</span>
              </div>
            </div>
            <div className="cart_main_contner">
              <div className="prd">
                {cart &&
                  cart.map((item, index) => (
                    <div key={index} className="product_container">
                      <div className="product_img_des_cont">
                        <div className="product_image_container">
                          <Link to={`/pdetails/${item.id}`}>
                          <span  className="cartImageContainer">
                            <img src={item.image} width="60px" height="60" />
                          </span></Link>
                        </div>
                        <div className="product_description_cont">
                          <div className="descrp_remove_cont">
                            <div className="descrp_container">
                              <div className="ovrflowhide">
                                <h4 className="title_para">{item.title}</h4>
                              </div>
                              <span>{item.price}</span>
                              <span>All Return</span>
                              <span>{item.rating.rate}</span>
                            </div>
                            <div className=" remove_container">
                              <button
                                className="remove_button"
                                onClick={(event) => {
                                  removItemFn(index, event);
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faX}
                                  className="removeicon"
                                />
                                <h4>REMOVE</h4>
                              </button>
                            </div>
                          </div>
                          <div className="edit_container">
                            <button className="edit_button">Edit</button>
                          </div>
                        </div>
                      </div>
                      <div className="free_delivery_container">
                        <span className="paraContainer">
                          <p className="paraStyle">Free Delivery</p>
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
              <div>
                <div className="total_price_container">
                  <div>
                    <div>
                      <span>
                        <p className="price_detail">Price Details</p>
                      </span>
                    </div>
                    <div>
                      <div className="total_prce">
                        <span>
                          <p>Total Product Price</p>
                        </span>
                        <span>+{totalprice}</span>
                      </div>
                      <div className="order_total">
                        <span>Order Total</span>
                        <span> Rs {totalprice}</span>
                      </div>
                    </div>
                    <div className="clicking_on">
                      <span>
                        clicking on 'Continue' will not deduct any money
                      </span>
                    </div>
                    <div className="continue_button">
                      <button onClick={updatePaymentfn}>Continue</button>
                    </div>
                  </div>
                  <div>
                    <img src={cartprice} width="350rem" height="150rem" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="cartImage_container">
            <div>
              <img src={cartImage} />
            </div>
            <div className="empty_cart_button">
              <div className="empty_cart_button">
                <h5>Your cart is empty</h5>
                <Link to="/">
                  <button>View Products</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    {/* <div className="editContainer">
        <div className="editsubcontainer"></div>
    </div> */}
    </>
  );
};

export default Cart;
