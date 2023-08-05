import React, { useEffect } from 'react';
import './Summary.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";

const Summary = () => {
    const navigate = useNavigate();

  useEffect( ()=>{
    callhomepage();
  },[]);

 const callhomepage =(()=>{
  setInterval(()=>{
    
  },5000)
 })
  return (
    <div className='summarypage'>
        <div className='summarypageh1'>
        <FontAwesomeIcon icon={faFaceSmile} className='similee' />
            <h2>Thank you for Shopping with Us!</h2>
        </div>
    </div>
  )
}

export default Summary