import React, { useEffect, useState,useContext } from "react";
import { DataAppContext } from "./AppData";
import { useParams, useNavigate, json } from "react-router-dom";
import './ProdDetails.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";




const ProductDetail = () => {

  const temp = useParams();
  const navigate = useNavigate();
  const localContext = useContext(DataAppContext);
  const{appState, setAppState} = localContext;
  const{pquantity, totalprice,emptyCartStatus} = appState;
  const [product, setProduct] = useState({});
  

  const fetchApi = async (pID) => {
    const res = await fetch(
      `https://content.newtonschool.co/v1/pr/63b6c911af4f30335b4b3b89/products/${pID}`
    );
    const resdata = await res.json();

    setProduct(resdata);
  };

  useEffect(() => {
    fetchApi(temp.id);
  }, [temp.id]);

  const addCartFn = ()=>{
    let tempCart = JSON.parse(localStorage.getItem('cart')) || [];
    localStorage.setItem("cart",JSON.stringify([...tempCart, product]));
    const tquant = JSON.parse(localStorage.getItem('cart'));
    let temprce = 0;
    tquant.map((tprdprice)=>{
      temprce = temprce + tprdprice.price
    })
    let crtstatus = true;
    if(temprce===0){
      crtstatus=false
    }
    setAppState({
      ...appState,
      pquantity : tquant.length,
      totalprice:temprce,
      emptyCartStatus:crtstatus
    })
    navigate('/cart');
  }

  const buynowFn =()=>{
    navigate('/address');
  }
 
  return (
    <div className="prodDetailPage">
      <div className="prodSubContainer">

        <div className="imgAndbtnContainer">
          <div className="smallImage">
          <img src={product.image} alt="image"/>
          </div>
          <div className="mainimageContainer">
            <div className="imageContainer">
            <img src={product.image} alt="image"/>
            </div>
            <div className="buyAndcartContainer">
              <button onClick={addCartFn} className="addcrtbtn"><FontAwesomeIcon icon={faCartShopping} /> Add to Cart</button>
              <button className="buybtn" onClick={buynowFn} ><FontAwesomeIcon icon={faAnglesRight} /> Buy Now</button>
            </div>
          </div>
        </div>
        <div className="pdDetailContainer">
          <div className="dtalbox">
          <div className="pdTitleContainer">{product.title}</div>
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
            {product.title}<br/>
            {product.description}</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;
