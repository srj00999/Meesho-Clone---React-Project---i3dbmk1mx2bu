import React, { useEffect, useState, useContext } from "react";
import { DataAppContext } from "./AppData";
import { useParams, useNavigate, json, Link } from "react-router-dom";
import "./ProdDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";



const ProductDetail = () => {

  const temp = useParams();
  const navigate = useNavigate();
  const localContext = useContext(DataAppContext);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [showbtn, setShowbtn] = useState(false);
  const { appState, setAppState } = localContext;
  const [product, setProduct] = useState({});
  const [allreayinCart, setAllReadyInCart] = useState(false);

  const { 
    pquantity, 
    totalprice, 
    emptyCartStatus, 
    buyNow 
  } = appState;



  //call api and set product to state adding quantity 1 by default
  const fetchApi = async (pID) => {
    const res = await fetch(
      `https://content.newtonschool.co/v1/pr/63b6c911af4f30335b4b3b89/products/${pID}`
    );
    const resdata = await res.json();
    setProduct({ ...resdata, qty: 1 }); 
  };


  // call api passing through product id 
  useEffect(() => {
    fetchApi(temp.id);
  }, [temp.id]);




  //Add product to cart
  const addCartFn = () => {
    let tempCart = JSON.parse(localStorage.getItem("cart")) || [];
    var status = true;
   
    tempCart.map((item)=>{
      if(item.id===product.id){
        status = false;
        setAllReadyInCart(true);
        setShowbtn(true);
        setTimeout(() => {
          setAllReadyInCart(false);
        }, 1500);
      }
    })
    if(status){
      localStorage.setItem("cart", JSON.stringify([...tempCart, product]));
      setIsAlertVisible(true);
      setShowbtn(true);
      setTimeout(() => {
        setIsAlertVisible(false);
      }, 1500);
    }
  
    const tquant = JSON.parse(localStorage.getItem("cart"));
    let temprce = 0;
    tquant.map((tprdprice) => {
      temprce = temprce + tprdprice.price;
    });
    let crtstatus = true;
    if (temprce === 0) {
      crtstatus = false;
    }
    setAppState({
      ...appState,
      pquantity: tquant.length,
      totalprice: temprce,
      buyStatus:false,
      emptyCartStatus: crtstatus,
    });
  };



//Buy product without adding to cart
  const buynowFn = () => {
    localStorage.setItem("singleorder", JSON.stringify([ product]));
    setAppState({
      ...appState,
      id: product.id,
      price: product.price,
      buyStatus:true,
      totalprice:product.price
    });
    navigate("/address");
  };



  return (
    <div className="prodDetailPage">
      <div className="prodSubContainer">
        {isAlertVisible && (
          <div className="alert-container">
            <div className="alert-inner">Product Added to Cart</div>
          </div>
        )}
        {allreayinCart && (
          <div className="alert-container">
            <div className="alert-inner">Product already in Cart</div>
          </div>
        )}
        <div className="imgAndbtnContainer">
          <div className="smallImage">
            <img src={product.image} alt="image" />
          </div>
          <div className="mainimageContainer">
            <div className="imageContainer">
              <img src={product.image} alt="image" />
            </div>
            <div className="buyAndcartContainer">
              {showbtn ? (
                <Link to="/cart">
                  <button onClick={addCartFn} className="addcrtbtn">
                    <FontAwesomeIcon icon={faCartShopping} /> Go to Cart
                  </button>
                </Link>
              ) : (
                <button onClick={addCartFn} className="addcrtbtn">
                  <FontAwesomeIcon icon={faCartShopping} /> Add to Cart
                </button>
              )}

              <button className="buybtn" onClick={buynowFn}>
                <FontAwesomeIcon icon={faAnglesRight} /> Buy Now
              </button>
            </div>
          </div>
        </div>

        <div className="pdDetailContainer">
          <div className="dtalbox">
            <div className="pdTitleContainer"><p>{product.title}</p></div>
            <div className="priceContainer">₹{product.price}</div>
            <div className="freeContainer">
              <span>Free Delivery</span>
            </div>
            <div className="reivewContainer">
              <span className="ratingconainer">
                {product.rating && product.rating.rate}
                <FontAwesomeIcon icon={faStar} className="star" />
              </span>
              <span className="leftItmeconainer">
                Left Item {product.rating && product.rating.count}
              </span>
            </div>
          </div>
          <div className="detailsSection">
            <div className="prdheading">Product Details</div>
            <div className="prdDescription">
              {product.title}
              <br />
              {product.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
