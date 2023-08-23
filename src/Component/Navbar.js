import React, {useContext} from 'react';
import { DataAppContext } from './AppData';
import "./Header.css";
import { useNavigate } from 'react-router-dom';



const Navbar = () => {
    const navigate = useNavigate()
    const localContext = useContext(DataAppContext);
    const{appState,setAppState}= localContext;
    const{ search } = appState;
    

    const navfn = (navitm) =>{
      setAppState({
        ...appState, search:navitm
      });  
      navigate('/searchitem')
    }

  return (
    <div>
         <div className="nav_container">
          <div className="nav">
            <div className="nav_items">
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
    </div>
  )
}

export default Navbar