import React,{useContext} from "react";
import { DataAppContext } from "./AppData";
import Messhologo from "../images/Meeshologo.png";
import SubProfile from "./SubProfile";
import DownloadApp from "./DownloadApp";
import "./Header.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";


const Header = () => {
  
  const localContext = useContext(DataAppContext);
  const{appState}= localContext;
  const{pquantity , loginStatus} = appState;


  return (
    <>
      <div className="header_nav_container">
        <div className="header_container">
          <div className="header">
            <div className="logo_input_container">
              <div className="logo_container">
                <Link to="/">
                  <img src={Messhologo} width="220x" height="150" />
                </Link>
              </div>
              <div className="input_container">
                <input
                  className="searchitemcontainer"
                  placeholder="    Try Saree,Kurthi or Search by Product Code"
                  type="text"
                />
              </div>
            </div>
            <div className="links_container">
              <div className=" links downloadappcontainer">
                <span className="links_download">
                  <Link >Download App </Link>
                </span>
              </div>
              <div className="hide"><DownloadApp/></div>
              <div className=" links">
                <span className="links_border">
                  <Link to="/">Become a supplier</Link>
                </span>
              </div>
              <div className="profile_line">
                <div className="profile_container">
                  <FontAwesomeIcon icon={faUser} fontSize="20px" />
                  <span className="profile">Profile</span>
                </div>
                <div className="hide"><SubProfile/></div>
              </div>        
              <div>
                <Link to='/cart'>
                <div className="profile_container">
                  {loginStatus && <span className="prdquantitycontainer"><p>{pquantity}</p></span>}
                  <FontAwesomeIcon icon={faCartShopping} fontSize="20px" />
                  <span className="profile">Cart</span>
                </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="nav_container">
          <div className="nav">
            <div className="nav_items">
              <span>
                <Link to="">View All</Link>
              </span>
              <span>
                <Link to="">Women Western</Link>
              </span>
              <span>
                <Link to="">Jewellery & Accessories</Link>
              </span>
              <span>
                <Link to="">Beauty & Health</Link>
              </span>
              <span>
                <Link to="">Bath & Body</Link>
              </span>
              <span>
                <Link to="">Bags & Footwear</Link>
              </span>
              <span>
                <Link to="">Home & Kitchen</Link>
              </span>
              <span>
                <Link to="">Kids</Link>
              </span>
              <span>
                <Link to="">Men</Link>
              </span>
              <span>
                <Link to="">Electronics</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
