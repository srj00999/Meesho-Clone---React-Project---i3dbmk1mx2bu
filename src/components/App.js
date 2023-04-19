import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import '../styles/App.css';
import AppData from './AppData';
import Home from './HomePage/Home';
import Register from './LoginRegister/Register';
import Login from './LoginRegister/Login';
import Product from './ProductLists/ProductList';
import Footer from './HomePage/Footer';
import ProdDetails from './ProductDetails/ProdDetails';
import Cart from './cart/Cart';
import PageNotFound from './HomePage/PageNotFound';
import CheckOut from './payment/CheckOut';



const App = () => {


  return (
    <div id="main">

      <AppData>
        <Home />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Product />} />
          <Route path='/pdetails/:id' element={<ProdDetails/>} />
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/*' element={<PageNotFound/>}/>
          <Route path='/checkout' element={<CheckOut/>}/>
        </Routes>
        <Footer />
      </AppData>

    </div>
  )
}


export default App;
