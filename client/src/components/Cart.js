import React, { useState, useEffect } from "react";
import Navbar from "../essentials/Navbar";
import Footer from "../essentials/Footer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const storedCartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/auth/login");
    }
    const total = storedCartItems.reduce((acc, item) => {
      return acc + item.quantity * item.price;
    }, 0);
    setTotalPrice(total);
  }, [storedCartItems]);

  return (
    <>
      <Navbar cartCount={storedCartItems.length} />
      <div className="averta bg-cream">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-9 col-12">
              <div className="container-fluid">
                <h2 className="mt-2">
                  <b>Cart</b>
                </h2>
                {storedCartItems.length > 0 ? (
                  <div className="">
                    {storedCartItems.map((item, index) => (
                      <div
                        className="row bg-white shadow-sm border rounded mb-2 p-3"
                        key={index}
                      >
                        <div className="col-md-3 p-0 m-0">
                          <img
                            src={item.img_url}
                            height={200}
                            style={{ maxHeight: "200px", width: "100%" }}
                            className="img-fluid rounded mb-2 mb-xl-0"
                            alt={item.name}
                          />
                        </div>
                        <div className="col-md-9">
                          <div className="">
                            <div className="d-flex justify-content-between">
                              <div>
                                <h4>
                                  <b>{item.name}</b>
                                </h4>
                              </div>
                              <div>
                                <h4>
                                  <b>₹ {item.price * item.quantity}</b>
                                </h4>
                              </div>
                            </div>
                            <div className="d-flex justify-content-between">
                              <div className="text-muted col-md-9">
                                {item.description}
                              </div>
                              <div className="">
                                <h6>
                                  <b>🛒 {item.quantity}</b>
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No items in the cart</p>
                )}
              </div>
            </div>
            <div className="col-md-3 mt-5">
              <div className="border rounded shadow-sm bg-white p-4 mt-2">
                <div className="d-flex justify-content-between">
                  <div>
                    <b>Sub Total:</b>
                  </div>
                  <div className="">
                    <b>₹ {totalPrice}</b>
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-2">
                  <div>
                    <b>Taxes & Charges:</b>
                  </div>
                  <div className="">
                    <b>₹ {totalPrice * 0.09}</b>
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-2">
                  <div>
                    <b>Total:</b>
                  </div>
                  <div className="">
                    <b>₹ {totalPrice + totalPrice * 0.09}</b>
                  </div>
                </div>
                <br />
                <Link to="/payment">
                  <button className="btn-junkin w-100">Payment Proceed</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <br />
        <Footer />
      </div>
    </>
  );
}
