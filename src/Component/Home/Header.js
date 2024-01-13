import React, { useContext } from "react";
import { DataAppContext } from "../AppData";
import Messhologo from "../images/Meeshologo.png";
import DownloadApp from "./DownloadApp";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileScreen, faBars } from "@fortawesome/free-solid-svg-icons";
import SearchComp from "./SearchComp";
import "../StyleComp/Header.css";
import ProfileCart from "../Profile/ProfileCart";

const Header = () => {
  const localContext = useContext(DataAppContext);
  const { appState } = localContext;
  const { showSearch, showProCart } = appState;

  return (
    <>
      <div className="header_nav_container">
        <div className="header_container">
          <div className="header">
            <div className="MobileNavmenuCont">
              <FontAwesomeIcon icon={faBars} />
            </div>
            <div className="logo_input_container">
              <div className="logo_container">
                <Link to="/">
                  <img src={Messhologo} alt="Messhologo" className="meshologo" />
                </Link>
              </div>
              {showSearch && (
                <div className="hidesrchinheader">
                  <SearchComp />
                </div>
              )}
            </div>

            <div className="links_container">
              <div className="links downloadappcontainer">
                <span className="links_download">
                  <Link to="/">
                    <FontAwesomeIcon icon={faMobileScreen} className="mobileIcon" /> Download App
                  </Link>
                </span>
              </div>
              <div className="hide">
                <DownloadApp />
              </div>
              <div className="links bcomeSuplierContainer">
                <span className="links_border" style={{ cursor: "pointer" }}>
                  <Link to="/">Become a supplier</Link>
                </span>
              </div>
              {showProCart && <ProfileCart />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
