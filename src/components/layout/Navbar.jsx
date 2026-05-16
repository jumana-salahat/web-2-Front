import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">FitGenie</div>

      <div className="nav-links">
        <a href="#">Home</a>
        <a href="#">Features</a>
        <a href="#">Pricing</a>
      </div>

      <div className="nav-actions">
        <Link to="/payment" className="login-btn">
          Payment
        </Link>

        <button className="primary-btn">Get Started</button>
      </div>
    </nav>
  );
}