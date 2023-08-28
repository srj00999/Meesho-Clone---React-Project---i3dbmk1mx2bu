import React, { useEffect, useState,useContext } from 'react';
import { DataAppContext } from '../AppData';
import '../StyleComp/Wishlist.css';
import "../StyleComp/ProductList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";


const Wishlist = () => {

    const [wishlstpd, setwishlstpd] = useState();
    const localContext = useContext(DataAppContext);
    const{appState ,setAppState}= localContext;
    const{name } = appState;
  

    const wishlstFn = () =>{
        let temwishlist =  JSON.parse(localStorage.getItem("wishlist")) || [];
        setwishlstpd(temwishlist);
    }

    const removItemFn = (index) => {
        let newWishlist = [...wishlstpd];
        newWishlist.splice(index, 1);
        localStorage.setItem("wishlist",JSON.stringify(newWishlist));
        setwishlstpd(newWishlist);
      };
    
    useEffect(()=>{
        wishlstFn();
        setAppState({
            ...appState,showSearch:true,showProCart:true
        })
    },[])

  return (
    <div className='wishlistcontainer'>
        <div className='wishlistsubcontainer'>
            <div className='profilesection'>
                <div className='myprofilebox'>
                    <div> <span className='usericonspan'><FontAwesomeIcon icon={faUser} className='userprofileiconsection' /></span></div>
                    <div className='profileusrname'>
                        <span>Hello,</span>
                        <span className='namesction'>{name}</span>
                    </div>
                </div>
                <div className='myorderbox'>
                    <div className='ordersectonbox'>
                        <span className='bagiconcontainer'><FontAwesomeIcon icon={faBagShopping} /></span>
                        <Link to="/myorder"><span>MY ORDER</span></Link>
                    </div>
                </div>
            </div>
            <div className='wishlistconstianer'>
                <div className='mywishlistheading'>My Wishlist({wishlstpd&& wishlstpd.length})</div>
                { wishlstpd && wishlstpd.length>0 && wishlstpd != undefined ? wishlstpd.map((item , index)=>(

                    <div className='prodcontaienr' >
                    <div  className='prdimageprice'>
                    <div className='prdimgcontainer'><Link to={`/pdetails/${item.id}`}>< img src={item.image} alt='image'/></Link></div>
                    <div className='pdtitleprice'>
                        <span className='wishlistpdtitle' key={item.id}>{item.title}</span>
                        <span className='wishlistpdrating'>
                        <span className="ratingconainer wishlistpdrating">
                            {item.rating.rate}
                            <FontAwesomeIcon icon={faStar} className="star" />
                          </span>
                            <span>{item.rating.count}</span>
                        </span>
                        <span className='wishlistpdprice'>Rs {item.price}</span>
                        </div>
                    </div>
                    <div className='removewishitem'>
                        <span onClick={(event)=>removItemFn(index)}><FontAwesomeIcon icon={faTrash} /></span>
                    </div>
                    </div>
                )):<div className='nopdfounddiv'>No Product Found!</div>}
            </div>
        </div>
    </div>
  )
}

export default Wishlist;