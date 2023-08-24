import React from "react";
import "../StyleComp/MyOrder.css";
import myorder from "../images/myorder.png";
import { Link } from "react-router-dom";


const MyOrder = () => {

  return (
    <div className="myorder">
      <div>
        <div>
          <img src={myorder} width="400px" height="200" />
        </div>
        <div className="trackorder">
          <div className="track">Track Orders on App</div>
          <div className="downapp">
            Download the Meesho App to track your orders
          </div>
          <div >
            <Link to='https://play.google.com/store/apps/details?id=com.meesho.supply&pid=pow_website&c=pow' className="downbtn" >
              <button>Download Meesho App</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
