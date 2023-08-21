import React, { useEffect, useState, useContext } from "react";
import "./ProductList.css";
import Footer from "./Footer";
import { Link,useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { DataAppContext } from "./AppData";


const SearchItem = () => {

  const navigate  = useNavigate()
  const localContext = useContext(DataAppContext);
  const { appState , setAppState } = localContext;
  const { search } = appState;
  const [defaultapi, setDefault] = useState([]);
  const [filterdata, setfilterData] = useState([]);

  const ProductAPI = async () => {
    const res = await fetch(
      "https://content.newtonschool.co/v1/pr/63b6c911af4f30335b4b3b89/products/"
    );
    const productlistdata = await res.json();
    setDefault(productlistdata);

    if (search === "") {
      setfilterData(productlistdata);
    } else {
      const filterResult = productlistdata.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.category.toLowerCase().includes(search.toLowerCase())
      );
      setfilterData(filterResult);
    }
   
  };


  const selectSort=(e)=>{
    e.preventDefault();
    if(e.target.value==="Relevance"){
    
        setfilterData(defaultapi);
      
    }else if(e.target.value=== "HighToLow"){     
    
        const originaldata = [...filterdata];
        const sortdata = originaldata.sort((a, b) => b.price - a.price);
        console.log(sortdata);
        setfilterData(sortdata);

    }else if(e.target.value=== "LowToHigh"){
      
        const originaldata = [...filterdata];
        const sortdata = originaldata.sort((a, b) => a.price - b.price);
        console.log(sortdata);
        setfilterData(sortdata);
     
    }else if(e.target.value=== "Rating"){    
     
        const originaldata = [...filterdata];
        const sortdata = originaldata.sort((a, b) => b.rating.rate - a.rating.rate);
        console.log(sortdata);
        setfilterData(sortdata);
     
    }
  }


  const filterprd =(str)=>{
    setAppState({
      ...appState, search:str
    })
    navigate('/searchitem')
  }


  useEffect(() => {
    ProductAPI();
  }, [search]);


  return (
    <div className="homepagemaincontainer">
      <div className="prdforyoucontainer">
       <span>Products For You</span>
      </div>
      <div>
        {filterdata && filterdata.length > 0 && filterdata != undefined ? (
          <div className="homepagesubmainContainer">
            <div className="productlistcontainer">
              <div className="productlistSubcontainer">
                <div className="filtercontainer">
                  <div className="sortcontainer sortitm">
                    <span>Sort Items:</span>
                    <span className="sortselect">
                      <select className="selectoption" onChange={selectSort} >
                        <option value="Relevance">Relevance</option>
                        <option value="HighToLow">Price (High to Low)</option>
                        <option value="LowToHigh">Price (Low to High)</option>
                        <option value="Rating">Rating</option>
                        </select>
                      </span>
                  </div>
                  <div className="Categorycontainer">
                    <div className="filterContnr">
                      <span>FILTERS</span>
                      <div className="pdplus">1000+ Products</div>
                    </div>
                    <div >
                      <div className="cateogrycontcainer"><span>Category</span></div>
                    <div className="categoryitems">
                    <div onClick={()=>filterprd("men's clothing")} >men's clothing</div>
                      <div onClick={()=>filterprd("women's clothing")}>women's clothing</div>
                      <div onClick={()=>filterprd("jewelery")}>jewelery</div>
                      <div onClick={()=>filterprd("electronics")}>electronics</div>
                    </div>
                    </div>
                  </div>
                </div>
                <div className="prdmainConainer">
                  {filterdata.map((item) => (
                    <div className="prdBox">
                      <Link to={`/pdetails/${item.id}`}>
                        <div className="imgContainer">
                          <img src={item.image} alt="image" className="imgg" />
                        </div>
                      </Link>
                      <div className="pdTitleContainer">{item.title}</div>
                      <div className="priceContainer">₹{item.price}</div>
                      <div className="freeContainer">
                        <span>Free Delivery</span>
                      </div>
                      <div className="reivewContainer">
                        <span className="ratingconainer">
                          {item.rating.rate}
                          <FontAwesomeIcon icon={faStar} className="star" />
                        </span>
                        <span className="leftItmeconainer">
                          Left Item {item.rating.count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="noitemFound">
            <div className="oppscontainer">
              <h1>Oops! No results found</h1>
              <h4>Don’t worry, try searching for something else</h4>
            </div>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default SearchItem;
