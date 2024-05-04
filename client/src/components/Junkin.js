import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";

export default function Junkin() {
  return (
    <>
      <title>Junkin</title>
      <div className="bg-cream container-fluid">
        <div className="averta d-flex flex-column justify-content-center align-items-center vh-100">
          <div className="text-center">
            <h1 className="mb-2">
              <b>
                <span style={{ fontSize: "200%" }}>
                  <span className="junk">Junk</span>
                  <span className="in">In</span>
                </span>
                <br />
                Where Junk Food Becomes an Irresistible Delight!
              </b>
            </h1>
            <h4>
              <Typewriter
                options={{
                  strings: [
                    "Welcome to Junkin! 🎉",
                    "Indulge in our gourmet junk food! 🍔🍟🍰",
                    "From burgers to desserts, we have it all. 🍔🍟🥤🍕🌭🍦",
                    "Treat your taste buds to flavor! 😋",
                    "Discover why Junkin is the go-to spot! 🔍👀",
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </h4>
            <br />
            <div className="d-flex justify-content-center">
              <Link to="/auth/login">
                <button className="me-5 btn-junkin">Customer</button>
              </Link>
              <Link to="/mauth">
                <button className=" btn-junkin">Manager</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
