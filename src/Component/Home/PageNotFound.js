import React from 'react';
import '../StyleComp/PageNotFound.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceFrown } from "@fortawesome/free-solid-svg-icons";

const PageNotFound = () => {
  return (
    <div className='pagenotfoundcontainer'>
        <div> <FontAwesomeIcon icon={faFaceFrown} className='notfoundpageicon' /></div>
        <div className='ntfnd'> Page Not Found!</div>
    </div>
  )
}

export default PageNotFound