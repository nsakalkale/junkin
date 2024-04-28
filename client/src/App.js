import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Junkin from "./components/Junkin";
import Auth from "./components/Auth";
import Error from "./components/Error";
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Junkin />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/auth/login" element={<Auth />} />
          <Route exact path="/auth/signup" element={<Auth />} />
          <Route exact path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
