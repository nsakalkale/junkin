import logo from "../images/favicon.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm p-3 sticky-top">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <img src={logo} alt="" width={"10%"} />
        </div>
        <div>
          <Link to="/" className="link">
            <p className="mb-0">Logout</p>
          </Link>
        </div>
      </div>
    </nav>
  );
}
