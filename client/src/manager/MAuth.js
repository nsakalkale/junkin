import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Auth() {
  const [password, setPassword] = useState("");
  const [mid, setMID] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("mtoken")) {
      navigate("/mdashboard");
    }
  }, []);

  function login(e) {
    e.preventDefault();
    axios
      .post(process.env.REACT_APP_LOGIN, {
        mid: mid,
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
          alert("Invalid");
        }
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <title>Authentication</title>
      <div className="container-fluid averta" style={{ overflowX: "hidden" }}>
        <div className="row vh-100 d-flex justify-content-center">
          <div className="col-md-4">
            <b onClick={() => navigate("/")} className="d-xl-none d-lg-none">
              <span style={{ fontSize: "200%", cursor: "pointer" }}>
                <span className="junk">Junk</span>
                <span className="in">In</span>
              </span>
            </b>
            <div className="mt-5 d-flex justify-content-center align-items-center">
              <div className=" p-5 shadow bg-green">
                <h2 className="mb-4 text-center">
                  <b>🔐LogIn</b>
                </h2>

                <div className={`mb-3`}>
                  <label htmlFor="username" className="form-label">
                    MID
                  </label>
                  <input
                    autoComplete="off"
                    type="text"
                    className="form-control"
                    id="mid"
                    placeholder="Enter MID"
                    value={mid}
                    onChange={(e) => setMID(e.target.value)}
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
                  <button className="btn-junkin" onClick={login}>
                    Login
                  </button>
                </div>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
