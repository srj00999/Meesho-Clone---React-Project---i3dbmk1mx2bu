
import React, { useState, useEffect, useContext } from 'react'
// import { useRef } from 'react';
import "./Cart.css"
import { Link } from 'react-router-dom';
import { DataAppContext } from '../AppData';
import { useNavigate } from 'react-router-dom';


const Cart = () => {

  const navigate = useNavigate();

  const localcontext = useContext(DataAppContext);
  const { appState, setAppState } = localcontext;
  const { loginStatus } = appState;
  const [cart, setCart] = useState([]);

  const {temdata , settempData} = useState();
  
  // const [previous, setPrevious] = useState(0);

  // const newRef = useRef();
  // useEffect(()=>{
  //   console.log("Reference", newRef.current.outerText);
  // });


  useEffect(() => {
    // Get the cart information from local storage
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartData);




    if (!loginStatus) {
      navigate("/login")
    }
    else {
      console.log("hello users");
    }

  }, []);


  // Function to update the cart information in local storage
  const updateCart = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
    setCart(cart);
  }

  // Function to handle the quantity input change
  const handleQuantityChange = (index, event) => {
    event.preventDefault();
    const newCart = [...cart];
    newCart[index].quantity = parseInt(event.target.value);
    updateCart(newCart);
  }

  // Function to handle the remove button click
  const handleRemoveClick = (index, event) => {
    event.preventDefault();
    const newCart = [...cart];
    newCart.splice(index, 1);
    updateCart(newCart);
  }

  // Calculate the total cost
  const totalCost = cart.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  console.log(totalCost, "totalCost");

  const checkoutFn = () => {

    setAppState({
      ...appState,
      totalCount: totalCost,
    })

  }

  useEffect(() => {

  }, [handleRemoveClick]);

console.log("temporary data ", typeof(temdata))

  return (
    <div className='cartpage'>

      <div className="cart1">
        <h1>Your Cart</h1>
        <div className="cart2">
          {cart.map((item, index) => (
            <div key={item.id} className="cart_id">
              <div className="cart_image">
                <img src={item.image} />
                <h3 >{item.title}</h3>

                <p className='price'>settempData({item.price})</p>
              </div>
              <div className='items'>
                <input
                  type="number"
                  min="1" placeholder='quantiy'
                  onChange={(event) => handleQuantityChange(index, event)}
                />
                <button onClick={(event) => handleRemoveClick(index, event)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
        <div className="total_cost">
          <h3>Total Cost:</h3>
          <p>${totalCost}</p>
        </div>
        <div className="btn">
          <button onClick={checkoutFn}><Link to={'/checkout'} className="payment_btn">Checkout</Link></button>
        </div>
      </div>
    </div>
  );

}

export default Cart;