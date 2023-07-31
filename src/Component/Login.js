import React, { useState , useContext } from "react";
import {DataAppContext} from './AppData';
import { useNavigate } from "react-router-dom";
import signup from "../images/signup.png";
import "./SignUp.css";
import { Link } from "react-router-dom";


const Login = () => {
  const initiaState = {
    email: "",
    password: "",
  };
const [loginStatus, setStatus] = useState(false);
const localContext = useContext(DataAppContext);
const {appState, setAppState} = localContext;
const {pquantity, emptyCartStatus} = appState;

  const navigate = useNavigate();
  const [formdata, setFormData] = useState(initiaState);

  const updateData = (e) => {
    let tempObj = {};
    tempObj[e.target.id] = e.target.value.trim();

    setFormData({ ...formdata, ...tempObj });
  };

  const loginFn = (e) => {
    e.preventDefault();

    let temp = JSON.parse(localStorage.getItem("users")) || [];
    temp.map((value) => {
      if (value.email === formdata.email) {
        if (value.password === formdata.password) {
          setStatus(true);
          const prdQuantity =  JSON.parse(localStorage.getItem("cart")) || [];
          let temp = 0;
          prdQuantity.map((pdprce)=>{
            temp = temp + pdprce.price; 
          })
          let cartpagestatus = true;
          if(temp===0){
            cartpagestatus = false;
          }
          let obj = {
            ...appState,
            loginStatus: true,
            name: value.name,
            pquantity:prdQuantity.length,
            totalprice:temp,
            emptyCartStatus:cartpagestatus
          }
          setAppState(obj);
          alert("login Succesful");
          navigate("/");
        }
      } else {
        console.log("");
      }
    });
  };

  return (
    <div className="signup_page">
      <div className="signup_container">
        <div>
          <img src={signup} width="450px" height="220" />
        </div>
        <div className="signup_input_container">
          <div className="signup_input_container_box">
            
            <div className="signup_heading">
              <p>Sign In to save your order</p>
            </div>
            <form onSubmit={loginFn}>
              <div className="phone_no_input">
                <span className="phone_no_input email">
                  <input
                    placeholder="Email Id"
                    type="text"
                    id="email"
                    onChange={updateData}
                    value={formdata.email}
                  />
                </span>
              </div>
              <div className="phone_no_input">
                <span className="phone_no_input">
                  <input
                    placeholder="Password"
                    type="password"
                    id="password"
                    onChange={updateData}
                    value={formdata.password}
                  />
                </span>
              </div>
              <div className="signin_container_box"><Link to='/signup'><p>Sign Up ?</p></Link></div>
              <div className="button_container">
                <div>
                  <button type="submit" value="Submit">
                    Continue
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div>
          <div className="condition_container">
            <div className="privacy_container">
              <p>
                By continuing, you agree to Meesho’s<br></br>
                <b>Terms & Conditions </b>and <b>Privacy </b>
                Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
