import React, { useEffect, useState,useContext } from "react";
import { DataAppContext } from "./AppData";
import { useParams, useNavigate, json } from "react-router-dom";
import './ProdDetails.css';


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

  return (
    <div className="prodetailpage">
      <div className="prodetailcontainer">
        <section className="main_product">
          <div className="imagecontainer">
            <div className="image1">
              <img src={product.image} />
            </div>
            <div className="image2">
              <div>
                <img src={product.image} />
              </div>
              <br></br>
              <br></br>
              <div>
                <button onClick={addCartFn}>Add to Cart</button>
              </div>
            </div>
          </div>

          <div className="detailcontainer">
            <div className="prod_details">
              <p className="pp">{product.title}</p>
              <h3> ₹ {product.price}</h3>
              <h3 className="rtt_h3">
                {" "}
                {product.rating && product.rating.rate}
              </h3>
              <p className="rtt_p">
                {" "}
                {product.rating && product.rating.count} Reviews
              </p>
            </div>

            <div className="prod_details">
              <h3>Select Size</h3>
              <button>Free Size</button>
              <button>S</button>
              <button>M</button>
              <button>L</button>
              <button>XL</button>
            </div>
            <div className="prod_details ">
              <h3> Product Details</h3>
              <p className="pp">Name : {product.title}</p>
              <p className="pp">{product.description}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;
