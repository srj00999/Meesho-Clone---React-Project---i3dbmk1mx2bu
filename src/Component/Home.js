import React from 'react';
import Header from './Header';
// import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <>
    <Header/>
    
    <Outlet/>
    </>
  )
}

export default Home