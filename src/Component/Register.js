import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const initialData = {
        name:'',
        email:'',
        password:''
    }

    const navigate = useNavigate();
    const[formdata , setFormData] = useState(initialData);

    const updateData = (e) =>{
        let tempObj = {};
        tempObj[e.target.id]  = e.target.value.trim();
        setFormData({
            ...formdata , ...tempObj
        })
    }

    const RegisterFn = (e) =>{
        e.preventDefault();

        let temp  =  JSON.parse(localStorage.getItem('users')) || [];
        localStorage.setItem('users', JSON.stringify([...temp , formdata]));
        setFormData(initialData);
        navigate('/login');
    }


  return (
    <div>
        <form onSubmit={RegisterFn}>
           <input placeholder='Name' type='text' id='name' onChange={updateData} value={formdata.name} />
           <input placeholder='Email' type='text' id='email' onChange={updateData} value={formdata.email}/>
           <input placeholder='Password' type='password' id='password' onChange={updateData} value={formdata.password}/>
           <input type='submit' value='Sign Up' />
        </form>
    </div>
  )
}

export default Register