import React from "react";
import "../styles/Footer.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-col">
          <h3>Organic Milletio</h3>
          <p><strong>Address:</strong> Hyderabad, TS</p>
          <p><strong>Call Us:</strong> +91 9052094646</p>
          <p><strong>Email:</strong> info@milletioglobalgrain.com</p>
        </div>
        <div className="footer-col">
          <h4>Policies</h4>
          <p onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); navigate("/Privacy-Policy"); }}>
            Privacy Policy
          </p>
          <p onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); navigate("/General-Information"); }}>
            General Information
          </p>
          <p onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); navigate("/Terms-of-Service"); }}>
            Terms of Service
          </p>
        </div>
      </div>

      <button
        className="scroll-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ⬆️
      </button>
    </footer>
  );
};

export default Footer;
