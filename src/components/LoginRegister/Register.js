import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../LoginRegister/LoginRegister.css';



export default function Register(){
    const initialData = {
        name:'',
        email : '',
        password: '',

    }
    const[formdata, setFormData] = useState(initialData);
    
    const navigate = useNavigate();

    const updateData = (e) =>{
       let tempObj = {};
       tempObj[e.target.id] = e.target.value.trim();
       setFormData({
        ...formdata,  ...tempObj
       })       
    }




    const registerFn=(e)=>{
        e.preventDefault();
        
        let temp = JSON.parse(localStorage.getItem('users')) || [];
        localStorage.setItem('users',JSON.stringify([...temp, formdata]));
        setFormData(initialData);
        navigate("/login")
        

    }
    return(
        <>
             <div className="loginregpage">
                <div className="logincontainer" >
                    <form onSubmit={registerFn} className="loginRegister">
                        <span><h2>Register</h2></span>
                        <input className="inputbox" placeholder="Name" type="text" id="name" onChange={updateData} value={formdata.name}  /><br></br>
                        <input className="inputbox" placeholder="Email Id" type="text" id="email" onChange={updateData} value={formdata.email}  /><br></br>
                        <input className="inputbox" placeholder="Password" type="password" id="password" onChange={updateData} value={formdata.password}  /><br></br><br></br>
                        <div className="loginbtncontainer">
                            <span><input className="loginbtn" type="submit" value="Register" /></span>
                            <span><Link to="/login"><button className='registerbtn'>Login</button></Link></span>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}