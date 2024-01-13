import React,{useContext, useState} from "react";
import { DataAppContext } from "../AppData";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "../StyleComp/Header.css";


const SearchComp = () => {

    const initialData = {
        search: ''
      };
    
      const navigate = useNavigate();
      const [formdata, setFormData] = useState(initialData);
      const localContext = useContext(DataAppContext);
      const{appState,setAppState}= localContext;
      const{ search } = appState;
    
    
      const updateData = (e) => {
        e.preventDefault()
        let tempObj = {};
        tempObj[e.target.id] = e.target.value;
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
        setFormData(initialData);
        if(formdata != ""){
          navigate("/searchitem");
        }  
      }
     
    
  return (
    <div className="input_container">
      <FontAwesomeIcon icon={faMagnifyingGlass} className="searchIcon"/>
      <form onSubmit={searchFn}>
        <input className="searchitemcontainer"
          placeholder="Try Saree,Kurthi or Search by Product..."
          type="text" id="search"  required onChange={updateData} value={formdata.search}>
        </input>
      </form>
    </div>
  )
}

export default SearchComp;