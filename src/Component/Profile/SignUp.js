import React, { useEffect, useState,useContext } from "react";
import { DataAppContext } from "../AppData";
import { useNavigate } from "react-router-dom";
import signup from "../images/signup.png";
import "../StyleComp/SignUp.css";
import { Link } from "react-router-dom";


const SignUp = () => {

  const initialData = {
    name: "",
    email: "",
    password: "",
  };

  const navigate = useNavigate();
  const localContext = useContext(DataAppContext);
  const { appState, setAppState } = localContext;
  const [formdata, setFormData] = useState(initialData);
  const [formerror, setFormerror] = useState({});


  const updateData = (e) => {
    let tempObj = {};
    tempObj[e.target.id] = e.target.value.trim();
    setFormData({
      ...formdata,
      ...tempObj,
    });
  };

  const RegisterFn = (e) => {
    e.preventDefault();
    const ret = validationFn();

    if (ret) {
    let temp = JSON.parse(localStorage.getItem("users")) || [];
    localStorage.setItem("users", JSON.stringify([...temp, formdata]));
    setFormData(initialData);
    navigate("/login");
    }
  };

  const validationFn = () => {

    let errorObj = {};
    if (formdata.name === '') {
      errorObj.name = 'Name is empty'
    }
    if (formdata.email === '') {
        errorObj.email = 'Email is empty'
    }
  
    if (formdata.password === '') {
        errorObj.password = 'Password is empty'
    }
    if (formdata.password.length < 6) {
        errorObj.password = 'Password must be greater than 5 digit'
    }
  
    setFormerror(errorObj);
  
    if (Object.keys(errorObj).length > 0) {
        return false
    }
    else {
        return true
    }
  }

  useEffect(()=>{
    setAppState({
      ...appState, showSearch:true,
      showProCart:false
    })
  },[])
  
  return (
   <>
    <div className="signup_page">
      <div className="signup_container">
        <div>
          <img src={signup} width="450px" height="220" loading="lazy" />
        </div>
        <form onSubmit={RegisterFn}>
          <div className="signup_input_container">
            <div className="signup_input_container_box">
              <div className="signup_heading">
                <p>Sign Up to save your order</p>
              </div>
              <div className="phone_no_input">
                <span className="phone_no_input usernameinput">
                  <input
                    className="usernameinput"
                    placeholder="First Name"
                    type="text"
                    id="name"
                    onChange={updateData}
                    value={formdata.name}
                  />
                </span>
              </div>
              <div style={{color:"red" , fontSize:"12px"}}>{formerror.name}</div>
              <div className="phone_no_input">
                <span className="phone_no_input">
                  <input
                    placeholder="Email"
                    type="text"
                    id="email"
                    onChange={updateData}
                    value={formdata.email}
                  />
                </span>
              </div>
              <div style={{color:"red" , fontSize:"12px"}}>{formerror.email}</div>
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
              <div style={{color:"red" ,fontSize:"12px"}}>{formerror.password}</div>
              <div className="signin_container_box"><Link to='/login'><p>Log In  ?</p></Link></div>

              <div className="button_container">
                <div>
                  <button type="submit" value="Sign Up">
                    Continue
                  </button>
                </div>
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
        </form>
      </div>
    </div>
   </>
  );
};

export default SignUp;
