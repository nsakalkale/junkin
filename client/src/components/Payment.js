import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Payment() {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("4701322211111234"); // Pre-fill card number
  const [otp, setOtp] = useState("1234"); // Pre-fill OTP
  const [isCardEntered, setIsCardEntered] = useState(false);
  const [isOtpEntered, setIsOtpEntered] = useState(false);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [redirectTimer, setRedirectTimer] = useState(5); // Timer for redirection
  const [customerDetails, setCustomerDetails] = useState(null);

  useEffect(() => {
    // Fetch customer details using token
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token).token_id;
      axios
        .post(process.env.REACT_APP_GETUSER, { id: decodedToken })
        .then((response) => {
          setCustomerDetails(response.data.senduser);
          console.log(response.data.senduser._id);
        })
        .catch((error) => {
          console.error("Error fetching customer details:", error);
        });
    }
  }, []);

  const handleCardInputChange = (event) => {
    setCardNumber(event.target.value);
  };

  const handleOtpInputChange = (event) => {
    setOtp(event.target.value);
  };

  const handleProceedClick = () => {
    setIsCardEntered(true);
  };

  const handleOtpProceedClick = () => {
    setIsOtpEntered(true);
  };

  const handlePayment = () => {
    setIsPaymentSuccessful(true);
    const cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];
    sessionStorage.removeItem("cartItems");
    toast.success("Payment Successful !", {
      position: "top-right",
      theme: "dark",
    });

    // Generate a random order ID
    const orderId = Math.floor(100000 + Math.random() * 900000);

    // Calculate order total from session storage data
    const orderTotal = cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    // Generate a random transaction ID
    const txnId = Math.random().toString(36).substr(2, 8);

    // Insert order data
    const orderData = {
      custid: customerDetails._id,
      orderid: orderId,
      orderdate: new Date().toISOString(),
      orderstatus: "Pending",
      ordertotal: orderTotal,
      orderitems: cartItems,
      txnid: txnId,
      paymentstatus: "Success",
    };

    axios
      .post(process.env.REACT_APP_ORDERENTRY, orderData)
      .then((response) => {})
      .catch((error) => {
        console.error("Error inserting order data:", error);
      });

    setTimeout(() => {
      navigate("/dashboard");
    }, 4000);
  };

  useEffect(() => {
    const timer =
      redirectTimer > 0 &&
      setInterval(() => setRedirectTimer((prevTimer) => prevTimer - 1), 1000);
    return () => clearInterval(timer);
  }, [redirectTimer]);

  return (
    <>
      <ToastContainer />
      <div className="bg-cream averta">
        <div className="container-fluid vh-100">
          <div className="d-flex justify-content-center align-items-center">
            <div className="card col-md-3 col-12 shadow-sm mt-5">
              <div className="card-body">
                <div className="">
                  <h1>
                    <b>Payments</b>
                  </h1>
                </div>
                <hr />
                {!isCardEntered ? (
                  <>
                    <h5 className="card-title">
                      <b>Enter Card Number</b>
                    </h5>
                    <input
                      type="text"
                      className="form-control"
                      value={cardNumber}
                      onChange={handleCardInputChange}
                    />
                    <button
                      className="btn-junkin mt-3"
                      onClick={handleProceedClick}
                    >
                      Proceed
                    </button>
                  </>
                ) : !isOtpEntered ? (
                  <>
                    <h5 className="card-title">
                      <b>Enter OTP</b>
                    </h5>
                    <input
                      type="text"
                      className="form-control"
                      value={otp}
                      onChange={handleOtpInputChange}
                    />
                    <button
                      className="btn-junkin mt-3"
                      onClick={handleOtpProceedClick}
                    >
                      Verify OTP
                    </button>
                  </>
                ) : (
                  <>
                    <h5 className="card-title">
                      <b>Confirm Payment</b>
                    </h5>

                    {isPaymentSuccessful ? (
                      <div className="alert alert-success" role="alert">
                        Order Confirmed! Thank you for your purchase. Have a
                        Nice Time Enjoying the Food !!!
                      </div>
                    ) : (
                      <button
                        className="btn-junkin me-3"
                        onClick={handlePayment}
                      >
                        Pay
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          <br />
          {isPaymentSuccessful && (
            <div className="mt-3 me-3 d-flex justify-content-center">
              <b>Redirecting in {redirectTimer} seconds...</b>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
