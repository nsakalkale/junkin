import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/favicon.png";
import cart from "../images/cart.png";
import logout_img from "../images/logout.png";
import "./Navbar.css";

export default function ManagerNavbar() {
  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }
  return (
    <nav className="bg-white shadow-sm p-3 sticky-top">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <img src={logo} alt="" width={"10%"} />
        </div>
        <div className="d-flex">
          <div className="">
            <img src={logout_img} onClick={logout} height={30} />
          </div>
        </div>
      </div>
    </nav>
  );
}
