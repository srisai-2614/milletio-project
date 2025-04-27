import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { FiSearch, FiUser, FiMenu, FiX } from "react-icons/fi";
import Logo from '../pages/assets/Logo.jpg';
import CartIcon from "../components/CartIcon";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button
          className="mobile-menu-icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        <div className={`nav-links left-nav ${isMobileMenuOpen ? "open" : ""}`}>
        <Link to="/" onClick={handleLinkClick}><h4 className="nav-heading">Home</h4></Link>
          <Link to="/products" onClick={handleLinkClick}><h4 className="nav-heading">Products</h4></Link>
          <Link to="/about" onClick={handleLinkClick}><h4 className="nav-heading">About Us</h4></Link>
        </div>
      </div>
      
      <div className="brand-container">
        <Link to="/" className="brand" onClick={handleLinkClick}>
          <img src={Logo} className="Logo" alt="Milletio Logo" />
        </Link>
      </div>
      
      <div className="navbar-right">
        <div className="nav-links right-nav">
          <Link to="/products" title="Search">
            <FiSearch size={24} />
          </Link>
          <Link to="/login" title="Login">
            <FiUser size={24} />
          </Link>
          <CartIcon />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;