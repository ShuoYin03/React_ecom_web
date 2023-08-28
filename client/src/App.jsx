import React, { useEffect } from 'react'
import Home from "./pages/Home"
import ProductList from './pages/ProductList';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Success from './pages/Success';
import Profile from './pages/Profile';
import { useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

const App = () => {
  const user = useSelector((state) => state.user);

  const ScrollToTop = () => {
    const location = useLocation();
    
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location.pathname]);
    
  };
  
  return (
    <Router>
      <ScrollToTop/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/products?/:category" element={<ProductList/>}/>
        <Route path="/product/:id" element={<Product/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/success" element={<Success/>}/>
        <Route path="/login" element = {<Login/>}/>
        <Route path="/register" element = {<Register/>}/>
        <Route path="/profile" element = {<Profile/>}/>
      </Routes>
    </Router>
  )
}
export default App
