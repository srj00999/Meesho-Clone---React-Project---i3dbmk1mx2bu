import React, { useState } from "react";
import '../LoginRegister/LoginRegister.css';
import { useContext } from "react";
import { DataAppContext } from "../AppData";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const initialState = {
        email: '',
        password: '',

    }


    const [loginStatus, setStatus] = useState(false);
    const [formerror, setFormerror] = useState({});
    const [loginFailStatus, setloginFailStatus] = useState(false);
    const [formdata, setFormData] = useState(initialState);
    const localcontext = useContext(DataAppContext);
    const { appState, setAppState } = localcontext;

    const navigate = useNavigate();

    const updateData = (e) => {
        let tempObj = {};
        tempObj[e.target.id] = e.target.value.trim();

        setFormData({
            ...formdata, ...tempObj
        })
    }

    const loginFn = (e) => {
        e.preventDefault();
        const ret = validationFn();

        if (ret) {
            let temp = JSON.parse(localStorage.getItem('users'));
            if (temp) {
                for (let i = 0; i < temp.length; i++) {
                    if (temp[i].email === formdata.email) {
                        if (temp[i].password === formdata.password) {

                            setStatus(true);
                            let obj = {
                                ...appState,
                                loginStatus: true,
                                name: temp[i].name,
                            }
                            setAppState(obj);
                            navigate('/');
                        } else {
                            //password not matched!
                        }
                    } else {
                        setloginFailStatus(true);
                    }
                }
                setFormData(initialState);
            }

        }
    }

    const validationFn = () => {

        let errorObj = {};

        if (formdata.email === '') {
            errorObj.email = 'Email is empty'
        }

        if (formdata.password === '') {
            errorObj.password = 'Password is empty'
        }

        setFormerror(errorObj);

        if (Object.keys(errorObj).length > 0) {
            return false
        }
        else {
            return true
        }

    }


    return (
        <>
            <div className="loginregpage">
                <div className="logincontainer">
                    <form onSubmit={loginFn} className="loginRegister">
                        <span><h2>Log In</h2></span>
                        <input className="inputbox" placeholder="Email Id" type="text" id="email" onChange={updateData} value={formdata.email} />
                        <div style={{color:"red"}}>{formerror.email}</div>
                        <br></br>
                        <input className="inputbox" placeholder="Password" type="password" id="password" onChange={updateData} value={formdata.password} />
                        <div style={{color:"red"}}>{formerror.password}</div><br></br>
                        <br></br>
                        <div className="loginbtncontainer">
                            <span><input className="loginbtn" type="submit" value="Log In" /></span>
                            <span><Link to="/register"><button className='registerbtn'>Register</button></Link></span>
                        </div>
                        
                    </form>
                    <div>

                            {loginStatus && <div className="alert alert-success" role="alert">
                                <h2>Successfully Logged In</h2>
                            </div>
                            }

                            {loginFailStatus && <div className="alert alert-danger" role="alert">
                                <h2>Login Failed</h2>
                            </div>
                            }

                        </div>
                </div>
            </div>
        </>
    )
}