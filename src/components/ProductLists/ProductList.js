import React, { useEffect, useState } from 'react';
import "./ProductList.css";
import { Link } from 'react-router-dom';


const Product = () => {

    const [data, setData] = useState([]);

    const fetchAPI = () => {

        fetch("https://content.newtonschool.co/v1/pr/63b6c911af4f30335b4b3b89/products/")
            .then(response => response.json())
            .then(dataItem => {
        
                setData(dataItem)
            })

    }


    useEffect(() => {

        fetchAPI();

    }, [])


    return (
        <div className="productpage">
            <div className="productcontainer">
                <div className="row1">
                    {
                        data.map((item) => (
                            <div className='each_product'>
                                <Link to={`/pdetails/${item.id}`} className="view_product" >

                                    <img src={item.image} className="img" />

                                    <p className="title1">{item.title}</p>
                                    <p className="price1"> ₹ {item.price} </p>
                                    <div className="rating1">
                                        <p className="rate">{item.rating.rate}</p>
                                        <p className="ratecc">{item.rating.count}  Reviews </p>
                                    </div>

                                </Link>

                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Product