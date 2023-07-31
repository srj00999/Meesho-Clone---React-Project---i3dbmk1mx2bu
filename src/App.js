import React from "react";
import AppData from "./Component/AppData";
import "./styles/App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Component/Home";
import ProductList from "./Component/ProductList";
import ProductDetail from "./Component/ProductDetail";
import CheckOut from "./Component/CheckOut";
import Payment from "./Component/Payment";
import Cart from "./Component/cart";
import SignUp from "./Component/SignUp";
import SubProfile from "./Component/SubProfile";
import Login from "./Component/Login";
import Register from "./Component/Register";
import DownloadApp from "./Component/DownloadApp";
import MyOrder from "./Component/MyOrder";

const App = () => {
  return (
    <>
      <AppData>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/" element={<ProductList />} />
            <Route path="pdetails/:id" element={<ProductDetail />} />
            <Route path="checkout" element={<CheckOut />} />
            <Route path="payment" element={<Payment />} />
            <Route path="cart" element={<Cart />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="subprofile" element={<SubProfile />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="downloadapp" element={<DownloadApp />} />
            <Route path="myorder" element={<MyOrder />} />
          </Route>
        </Routes>
      </AppData>
    </>
  );
};

export default App;
