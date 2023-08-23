import React,{useContext, useState} from "react";
import { DataAppContext } from "./AppData";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";



const SearchComp = () => {
    const initialData = {
        search:''
      };
    
      const navigate = useNavigate();
      const [formdata, setFormData] = useState(initialData);
      const localContext = useContext(DataAppContext);
      const{appState,setAppState}= localContext;
      const{ search } = appState;
    
    
      const updateData = (e) => {
        e.preventDefault()
        let tempObj = {};
        tempObj[e.target.id] = e.target.value.trim();
        setFormData({
          ...formdata,
          ...tempObj,
        });
      };
    
      const searchFn = (e) => {
        e.preventDefault();
        setAppState({
          ...appState,
          ...formdata
    
        });
        if(search){
          navigate("/searchitem");
        }
        
      }
    
  return (
    <div className="input_container">
    <FontAwesomeIcon icon={faMagnifyingGlass} className="searchIcon"/>
      <form onSubmit={searchFn}>
      <input className="searchitemcontainer"
        placeholder="Try Saree,Kurthi or Search by Product Code"
        type="text" id="search" onChange={updateData} value={formdata.search}>
        </input>
      </form>
      </div>
  )
}

export default SearchComp