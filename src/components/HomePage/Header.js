import React from "react";
import { Link, useNavigate } from "react-router-dom";
import meeshologo from "../Images/meeshologo.png";
import "./Header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faMobileScreenButton } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { DataAppContext } from "../AppData";


export default function Header() {
    const localcontext = useContext(DataAppContext);
    const { appState, setAppState } = localcontext;
    const { name, loginStatus } = appState;
    const navigate = useNavigate();


    const logoutFn = () => {
        setAppState({
            ...appState,
            loginStatus: false,
            name: '',
        })
        navigate('/');
    }

    return (
        <>
            <div className="header">
                <div className='headercontainer'>
                    <div className='logoandsearch'>
                        <div>
                            <span>
                                <Link to='/'><img src={meeshologo} width="280px" height="200" /></Link>
                            </span>
                        </div>
                        <div>
                            <span>
                                <input className="searchitemcontainer" placeholder=" Try Saree,Kurthi or Search by Product Code" type="text" /><br></br>
                            </span>
                        </div>
                    </div>
                    <div>
                        <div className="navlink">
                            <div >
                                <span className="linkcontainer" >
                                    <FontAwesomeIcon icon={faMobileScreenButton} style={{ fontSize: "23px", marginRight: "5px" }} />
                                    <Link to='/'>Download App </Link>
                                </span>
                            </div>
                            <div >
                                <span className="linkcontainer supliercontainer " >
                                    <Link to='/'>Become a supplier</Link>
                                </span>
                            </div>
                            <div>
                                <div className="logoutcontainer">
                                    <span><FontAwesomeIcon icon={faUser} />
                                       {
                                            loginStatus ? <> {loginStatus && <span><h4>Hi {name} </h4><Link onClick={logoutFn}>Logout</Link></span>}</> : <Link to='/login'>Profile</Link>
                                        }
                                    </span>

                                        <span>
                                            <FontAwesomeIcon icon={faCartShopping} />
                                            <Link to='/cart'>Cart</Link>
                                        </span>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="navbar">
                <div className='navbarcontainer'>
                    <Link to="">View All</Link>
                    <Link to="">Women Western</Link>
                    <Link to="">Jewellery & Accessories</Link>
                    <Link to="">Beauty & Health</Link>
                    <Link to="">Bath & Body</Link>
                    <Link to="">Bags & Footwear</Link>
                    <Link to="">Home & Kitchen</Link>
                    <Link to="">Kids</Link>
                    <Link to="">Men</Link>
                    <Link to="">Electronics</Link>
                </div>
            </div>
        </>
    )
}