import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Junkin from "./components/Junkin";
import Auth from "./components/Auth";
import Error from "./components/Error";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Payment from "./components/Payment";
import AddProducts from "./manager/AddProducts";
import MAuth from "./manager/MAuth";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Junkin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/addproducts" element={<AddProducts />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/auth/login" element={<Auth />} />
          <Route path="/auth/signup" element={<Auth />} />
          <Route path="/mauth" element={<MAuth />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
