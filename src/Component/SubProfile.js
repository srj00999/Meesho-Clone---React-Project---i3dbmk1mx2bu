import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import "./SubProfile.css";
import { Link, useNavigate } from "react-router-dom";
import { DataAppContext } from "./AppData";

const SubProfile = () => {
  
  const navigate = useNavigate()
  const localContext = useContext(DataAppContext);
  const {appState, setAppState} =localContext;
  const {loginStatus,name} = appState;

  const logoutFn = () =>{
    setAppState({
      ...appState,
      loginStatus:false,
      name:'' ,
      pquantity:'',
    })
    navigate('/');
  
  }

  return (
    <div>
      {loginStatus ?
      (
        <>
          <div className=" subProfile_container">
            <div className="loginsubcontainer">
              <div className="namebox">
                <span className="userContainerbox">
                <FontAwesomeIcon icon={faCircleUser} className="iconsize"/>
                </span>
                <span className="namecontainr"> Hi { name} ! </span>
              </div>
              <div className="myordersection ">
                <span>
                  <FontAwesomeIcon icon={faBagShopping} className="changeiconColor"/>
                </span>
                <span className="myordrcontainer">
                 <Link to='myorder'>
                 <span>
                    <p className="paratag">My Orders</p>
                  </span>
                 </Link>
                </span>
              </div>
              <div className="nameboxx">
                <span className="paratagg">
                  <FontAwesomeIcon icon={faRightFromBracket} className="changeiconColor" />
                </span>
                <span className="logoutcontainer">
                  <button onClick={()=>{logoutFn()}}>
                    <p className="paratagg">Logout</p>
                  </button>
                </span>
              </div>
            </div>
          </div>
        </>
      ):
      (
        <>
          <div className=" subProfile_container">
            <div className="subProfile_data">
              <div>
                <div className="profile_users_container">
                  <span className="helloUser">
                    <h1>Hello User</h1>
                  </span>
                  <span className="helloUser">
                    <p>To access your Messho account</p>
                  </span>
                  <div className="signup_containerr">
                    <Link to="/signup">
                      <button>Sign Up</button>
                    </Link>
                  </div>
                </div>
                <div className="myorder_container">
                  <span>
                    <FontAwesomeIcon icon={faBagShopping} />
                  </span>
                  <Link to="/myorder">
                    <span>My Order</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      ) }
    </div>
  );
};

export default SubProfile;
