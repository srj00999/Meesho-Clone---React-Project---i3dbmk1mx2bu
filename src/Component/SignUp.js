import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import signup from "../images/signup.png";
import "./SignUp.css";
import { Link } from "react-router-dom";

const SignUp = () => {
  const initialData = {
    name: "",
    email: "",
    password: "",
  };

  const navigate = useNavigate();
  const [formdata, setFormData] = useState(initialData);

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

    let temp = JSON.parse(localStorage.getItem("users")) || [];
    localStorage.setItem("users", JSON.stringify([...temp, formdata]));
    setFormData(initialData);
    navigate("/login");
  };

  return (
    <div className="signup_page">
      <div className="signup_container">
        <div>
          <img src={signup} width="450px" height="220" />
        </div>
        <form onSubmit={RegisterFn}>
          <div className="signup_input_container">
            <div className="signup_input_container_box">
              <div className="signup_heading">
                <p>Sign Up to save your order</p>
              </div>
              <div className="phone_no_input">
                <span className="phone_no_input">
                  <input
                    placeholder="Name"
                    type="text"
                    id="name"
                    onChange={updateData}
                    value={formdata.name}
                  />
                </span>
              </div>
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
              <div className="signin_container_box"><Link to='/login'><p>Log In  ?</p></Link></div>

              <div className="button_container">
                <div>
                  <button type="submit" value="Sign Up">
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
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

export default SignUp;
