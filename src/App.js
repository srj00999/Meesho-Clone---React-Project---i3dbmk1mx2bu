import React from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/App.css";
import AppData from "./Component/AppData";
import Home from "./Component/Home/Home";
import ProductList from "./Component/Product/ProductList";
import ProductDetail from "./Component/Product/ProductDetail";
import CheckOut from "./Component/Checkout/CheckOut";
import Payment from "./Component/Checkout/Payment";
import Cart from "./Component/Cart/Cart";
import SignUp from "./Component/Profile/SignUp";
import SubProfile from "./Component/Home/SubProfile";
import Login from "./Component/Profile/Login";
import Register from "./Component/Profile/Register";
import DownloadApp from "./Component/Home/DownloadApp";
import MyOrder from "./Component/Checkout/MyOrder";
import Address from "./Component/Profile/Address";
import Summary from "./Component/Checkout/Summary";
import SearchItem from "./Component/Product/SearchItem";
import Footer from "./Component/Home/Footer";
import Navbar from "./Component/Home/Navbar";
import Wishlist from "./Component/Profile/Wishlist";
import PageNotFound from "./Component/Home/PageNotFound";
import Loder from "./Component/Home/Loder";

const App = () => {
  return (
    <>
      <AppData>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/" element={<ProductList />} />
            <Route path="loder" element={<Loder />} />
            <Route path="pdetails/:id" element={<ProductDetail />} />
            <Route path="checkout" element={<CheckOut />} />
            <Route path="payment" element={<Payment />} />
            <Route path="cart" element={<Cart />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="subprofile" element={<SubProfile />} />
            <Route path="wishlist" element={<Wishlist/>} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="downloadapp" element={<DownloadApp />} />
            <Route path="myorder" element={<MyOrder />} />
            <Route path="checkout" element={<CheckOut />} />
            <Route path="address" element={<Address />} />
            <Route path="summary" element={<Summary />} />
            <Route path="navbar" element={<Navbar />} />
            <Route path="searchitem" element={<SearchItem />} />
            <Route path="footer" element={<Footer />} />
            <Route path="*" element={<PageNotFound/>} />
          </Route>
        </Routes>
      </AppData>
    </>
  );
};

export default App;
