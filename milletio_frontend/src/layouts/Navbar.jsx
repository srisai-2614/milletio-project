// Navbar.js
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiUser, FiMenu, FiX } from "react-icons/fi";
import CartIcon from "../components/CartIcon";
import Logo from '../pages/assets/Logo.jpg';
import "../styles/Navbar.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close menu when clicking outside navigation
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navRef.current && 
        !navRef.current.contains(event.target) &&
        mobileMenuRef.current && 
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} ref={navRef}>
        <div className="navbar-left">
          <button
            className="mobile-menu-icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <div className="desktop-nav-links left-nav">
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
            <Link to="/products" title="Search" className="icon-link">
              <FiSearch size={20} />
            </Link>
            <Link to="/login" title="Login" className="icon-link">
              <FiUser size={20} />
            </Link>
            <CartIcon />
          </div>
        </div>
      </nav>
      
      {/* Mobile menu overlay */}
      <div 
        className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}
        ref={mobileMenuRef}
      >
        <div className="mobile-menu-content">
          <Link to="/" onClick={handleLinkClick}><h4 className="mobile-nav-heading">Home</h4></Link>
          <Link to="/products" onClick={handleLinkClick}><h4 className="mobile-nav-heading">Products</h4></Link>
          <Link to="/about" onClick={handleLinkClick}><h4 className="mobile-nav-heading">About Us</h4></Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;