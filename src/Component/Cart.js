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
  const [qty, setQty] = useState(1);
  const [editTPrice, setEditTPrice] = useState();
  const [edit, setEdit] = useState();
  const [showRemove, setShowRemove] = useState();
  const [editQuantity, setQuatity] = useState();
  const [saveindex, setSaveindex] = useState();
  const localContext = useContext(DataAppContext);
  const { appState, setAppState } = localContext;
  
  const {
     loginStatus,
     pquantity,
     totalprice, 
     emptyCartStatus, 
     price 
    } = appState;



  //before rendering page check login status and fetch cart data from localStorage.
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartData);
      setAppState({
        ...appState, showSearch:false,
        showProCart:false
      })    
    if (!loginStatus) {
      navigate("/login");
    }
  }, []);



  //updateCart items with price
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
      totalprice: tempPrice.toFixed(2),
      emptyCartStatus: crtstatuss,
    });
  };


  //Remove item from cart
  const removItemFn = (index) => {
    setShowRemove(false);
    const newCart = [...cart];
    newCart.splice(index, 1);
    updateCart(newCart);
  };


   //update specific product with price and set into global state
   const updatePaymentfn = () => {
    setAppState({
      ...appState,
      price: "",
      id: "",
    });
    navigate("/address");
  };


  //call edit side bar passing through index value
  const editItem = (index) => {
    setEdit(true);
    setSaveindex(Number(index))
    setQuatity(cart[index]);
    setQty(cart[index].qty);
    setEditTPrice(cart[index].price);
  };

  //update edit product with price and qty in cart
  const editSavePrd = () => {
    setQuatity(
      (editQuantity.qty = qty),
      (editQuantity.price = editTPrice),
      setEdit(false),
      setQty(1)
    );
    const newCart = [...cart];
    newCart.splice(saveindex, 1 , editQuantity);
    updateCart(newCart);
  };


  //Control increase and decrease Quantity
  const increaseQty = () =>{
    setQty(qty+1);
    setEditTPrice(editTPrice/qty*(qty+1))
  }
  const decreaseQty = () =>{
    setQty(qty-1);
    if(qty-1<1){
      setEdit(false)
      setShowRemove(true);
    }
    setEditTPrice(editTPrice/qty*(qty-1))    
  }

  //remove Edit Items
  const removeItem =() =>{
    removItemFn(saveindex );
  }


  return (
    <div className="cartPage_Main_Container">
      <div className="cart_page">
        {emptyCartStatus ? (
          <>
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
                                <span className="cartImageContainer">
                                  <img
                                    src={item.image}
                                    width="60px"
                                    height="60"
                                  />
                                </span>
                              </Link>
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
                                <button
                                  className="edit_button"
                                  onClick={() => editItem(index)}
                                >
                                  Edit
                                </button>
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
            {showRemove &&
                <div className="removeCont">
                  <div className="removeSubCon">
                  <div className="removitemcontainer">
                  <div className="removeheading">
                      <h2>Remove product from cart</h2>
                   </div>
                   <div className="removetitle">
                    {true && <p>{editQuantity.title}</p>}
                   </div>
                   <div className="RbtnContainer">
                    <button onClick={()=>setShowRemove(false)}>CANCEL</button>
                    <button  onClick={removeItem}>REMOVE</button>
                   </div>
                  </div>
                  </div>
                </div>
                }

            {edit && (
              
              <div className="editContainer">
                <div className="editsubcontainer " >
                  <div className="quantityContainer">
                    <div className="editQuantityHeader">
                      <span>EDIT ITEM</span>
                      <span>
                        <button onClick={() => setEdit(false)}>X</button>
                      </span>
                    </div>
                    <div className="prodQuantCont">
                      <div className="product_img_des_cont">
                        <div className="product_image_container">
                          <span className="cartImageContainer">
                            <img
                              src={editQuantity.image}
                              width="50px"
                              height="50px"
                            />
                          </span>
                        </div>
                        <div className="product_description_cont">
                          <div className="descrp_remove_cont">
                            <div className="descrp_container">
                              <div className="ovrflowhide">
                                <h4 className="title_para">
                                  {editQuantity.title}
                                </h4>
                              </div>
                              <span className="QuantpriceC">
                                ₹ {editQuantity.price}
                              </span>
                            </div>
                            <div className="increDecCon">
                              Qty
                              <span>
                                <span className="icremenSubcontainer">
                                  <button onClick={decreaseQty}> - </button>
                                  <span>{qty}</span>
                                  <button onClick={increaseQty}> + </button>
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="totPricecon">
                      <span>Total Price</span>
                      <span>₹{editTPrice}</span>
                    </div>

                    <div className="editbtncontainr">
                      <button onClick={editSavePrd}>Continue</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
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
    </div>
  );
};

export default Cart;
