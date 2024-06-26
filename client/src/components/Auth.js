import React, { useEffect, useState } from "react";
import Login_Image from "../images/login_img.png";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Auth() {
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [auth, setAuth] = useState(true);
  const page = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    } else {
      if (page === "login") {
        setAuth(true);
      } else if (page === "signup") {
        setAuth(false);
      }
    }
  }, [page]);

  function signup(e) {
    e.preventDefault();
    axios
      .post(process.env.REACT_APP_SIGNUP, {
        fname: fname,
        lname: lname,
        username: username,
        phoneno: phoneno,
        email: email,
        password: password,
      })
      .then((res) => {
        setFName("");
        setLName("");
        setEmail("");
        setPassword("");
        setPhoneno("");
        setUsername("");
        navigate("/auth/login", { state: { username, password } });
        console.log(res);
      })
      .catch((err) => console.log(err));
  }
  //LOGIN
  function login(e) {
    e.preventDefault();
    axios
      .post(process.env.REACT_APP_LOGIN, {
        username: username,
        password: password,
      })
      .then((res) => {
        if (!res.data.error) {
          const token = res.data.token;
          localStorage.setItem("token", token);
          const decoded = jwtDecode(token);
          console.log(decoded);
          navigate("/dashboard");
        } else if (res.data.error) {
          toast.error("Invalid Credentials !! Try Again !", {
            position: "top-right",
            theme: "dark",
          });
        }
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  function signuppage() {
    setAuth(false);
    setUsername("");
    setPassword("");
    navigate("/auth/signup");
  }
  function loginpage() {
    setAuth(true);
    setUsername("");
    setPassword("");
    navigate("/auth/login");
  }

  return (
    <>
      <title>Authentication</title>

      <div className="container-fluid averta" style={{ overflowX: "hidden" }}>
        <div className="row vh-100">
          <div className="col-md-6 bg-cream d-none d-md-flex ">
            <b onClick={() => navigate("/")}>
              <span style={{ fontSize: "200%", cursor: "pointer" }}>
                <span className="junk">Junk</span>
                <span className="in">In</span>
              </span>
            </b>

            <div className="d-flex justify-content-center align-items-center">
              <img
                src={Login_Image}
                className="img-fluid"
                alt="Login"
                height={1000}
              />
            </div>
          </div>
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <div>
              <b onClick={() => navigate("/")} className="d-xl-none d-lg-none">
                <span style={{ fontSize: "200%", cursor: "pointer" }}>
                  <span className="junk">Junk</span>
                  <span className="in">In</span>
                </span>
              </b>
              <div className="d-flex justify-content-center align-items-center">
                <div className=" p-5 shadow bg-green">
                  <h2 className="mb-4 text-center">
                    {auth ? <b>🔐LogIn</b> : <b>📝SignUp</b>}
                  </h2>
                  <div className="d-flex">
                    <div className={`mb-3 me-2 ${auth ? "d-none" : ""}`}>
                      <label htmlFor="name" className="form-label">
                        First Name
                      </label>
                      <input
                        autoComplete="off"
                        type="text"
                        className="form-control"
                        id="fname"
                        placeholder="Enter First Name"
                        value={fname}
                        onChange={(e) => setFName(e.target.value)}
                      />
                    </div>
                    <div className={`mb-3 ${auth ? "d-none" : ""}`}>
                      <label htmlFor="name" className="form-label">
                        Last Name
                      </label>
                      <input
                        autoComplete="off"
                        type="text"
                        className="form-control"
                        id="lname"
                        placeholder="Enter Last Name"
                        value={lname}
                        onChange={(e) => setLName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className={`mb-3 ${auth ? "d-none" : ""}`}>
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      autoComplete="off"
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className={`mb-3 ${auth ? "d-none" : ""}`}>
                    <label htmlFor="phoneno" className="form-label">
                      Phone No.
                    </label>
                    <input
                      autoComplete="off"
                      type="tel"
                      className="form-control"
                      id="phoneno"
                      placeholder="Enter Phone Number"
                      value={phoneno}
                      onChange={(e) => setPhoneno(e.target.value)}
                    />
                  </div>
                  <div className={`mb-3`}>
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="Enter Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      autoComplete="off"
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="text-center">
                    {auth ? (
                      <button className="btn-junkin" onClick={login}>
                        Login
                      </button>
                    ) : (
                      <button className="btn-junkin" onClick={signup}>
                        Sign Up
                      </button>
                    )}
                  </div>
                  <hr />
                  <div className="text-center">
                    {auth ? (
                      <>
                        <span>Wanna Create an Account ? </span>
                        <span className="links" onClick={signuppage}>
                          Sign Up
                        </span>
                      </>
                    ) : (
                      <>
                        <span>Already have an account ? </span>
                        <span className="links" onClick={loginpage}>
                          Login
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
