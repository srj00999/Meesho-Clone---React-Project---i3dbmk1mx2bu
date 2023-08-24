import React,{useContext} from "react";
import { DataAppContext } from "../AppData";
import SubProfile from "../Home/SubProfile";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";


const ProfileCart = () => {

  const localContext = useContext(DataAppContext);
  const{appState}= localContext;
  const{pquantity , loginStatus} = appState;

  return (
    <>
      <div className="profile_line">
        <div className="profile_container">
            <FontAwesomeIcon icon={faUser} fontSize="20px" className="profileIcon" />
            <span className="profile">Profile</span>
        </div>
        <div className="hide"><SubProfile/></div>
      </div>            
      <div>
        <Link to='/cart'>
            <div className="profile_container">
                {loginStatus && <span className="prdquantitycontainer"><p>{pquantity}</p></span>}
                <FontAwesomeIcon icon={faCartShopping} fontSize="20px" className="cartIcon" />
                <span className="profile">Cart</span>
            </div>
        </Link>
      </div>
    </>
  )
}

export default ProfileCart;