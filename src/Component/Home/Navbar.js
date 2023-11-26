import React, {useContext} from 'react';
import { DataAppContext } from '../AppData';
import "../StyleComp/Header.css";
import { useNavigate } from 'react-router-dom';
import SearchComp from './SearchComp';


const Navbar = () => {

    const navigate = useNavigate()
    const localContext = useContext(DataAppContext);
    const{appState,setAppState}= localContext;
    
    const navfn = (navitm) =>{
      setAppState({
        ...appState, search:navitm
      });  
      navigate('/searchitem')
    }

  return (
    <div>
         <div className="nav_container mobilenav">
          <div className="nav mobilenavdiv">
            <div className="nav_items mobilenavitem">
              <span>
                <p onClick={()=>navfn('')} >View All</p>
              </span>
              <span>
                <p onClick={()=>navfn("women's clothing")}>Women Western</p>
              </span>
              <span>
                <p onClick={()=>navfn("jewelery")}>Jewellery & Accessories</p>
              </span>
              <span>
                <p onClick={()=>navfn("")}>Beauty & Health</p>
              </span>
              <span>
                <p onClick={()=>navfn('Women')} >Bath & Body</p>
              </span>
              <span>
                <p onClick={()=>navfn('Fjallraven')} >Bags & Footwear</p>
              </span>
              <span>
                <p onClick={()=>navfn('Relevance')}>Home & Kitchen</p>
              </span>
              <span>
                <p onClick={()=>navfn('DANVOUY')}>Kids</p>
              </span>
              <span>
                <p onClick={()=>navfn("men's clothing")}>Men</p>
              </span>
              <span>
                <p onClick={()=>navfn("electronics")} >Electronics</p>
              </span>
            </div>
          </div>
          
        </div>
        <div className='searchinNav'><SearchComp/></div>
    </div>
  )
}

export default Navbar;