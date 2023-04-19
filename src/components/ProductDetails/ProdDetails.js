import React from 'react'
import "./ProdDetails.css"
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const ProdDetails = () => {

  const navigate = useNavigate();

  const temp = useParams();


  const [product, setProduct] = useState({});


  const fetchAPI = async (pId) => {

    const res = await fetch(`https://content.newtonschool.co/v1/pr/63b6c911af4f30335b4b3b89/products/${pId}`)
    const data1 = await res.json()

    setProduct(data1)

  }

  const addCartFn = () => {

    let tempCart = JSON.parse(localStorage.getItem('cart')) || [];
    localStorage.setItem("cart", JSON.stringify([...tempCart, product]));
    navigate('/cart');

  }

  useEffect(() => {

    fetchAPI(temp.id);

  }, [temp.id])


  return (
    <div className='prodetailpage'>

      <div className='prodetailcontainer'>
        <section className='main_product'>

          <div className='imagecontainer'>
            <div className="image1">
              <img src={product.image} />
            </div>
            <div className="image2">
              <div><img src={product.image} /></div><br></br><br></br>
              <div><button onClick={addCartFn}>Add to Cart</button></div>
            </div>
          </div>

          <div className='detailcontainer'>
            <div className="prod_details">
              <p className='pp'>{product.title}</p>
              <h3> ₹ {product.price}</h3>
              <h3 className="rtt_h3"> {product.rating && product.rating.rate}</h3>
              <p className="rtt_p"> {product.rating && product.rating.count} Reviews</p>
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
              <p className='pp'>Name : {product.title}</p>
              <p className='pp' >{product.description}</p>
            </div>
          </div>

        </section>

      </div>

    </div>
  )
}

export default ProdDetails