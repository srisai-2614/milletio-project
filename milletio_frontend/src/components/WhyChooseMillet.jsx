import React from "react";
import { FaSeedling, FaLeaf, FaBreadSlice, FaHandHoldingHeart, FaHeartbeat, FaHistory } from "react-icons/fa";
import { GiFarmTractor, GiWheat } from "react-icons/gi";
import "../styles/WhyMilletio.css";

const WhyChooseMillet = () => {
  return (
    <section className="why-milletio-section">
      <div className="farm-background">
        <div className="plowed-field-top"></div>
        <div className="plowed-field-bottom"></div>
      </div>
      
      <div className="why-milletio-container">
        <div className="why-milletio-grid">
          <div className="highlight-card">
            <div className="barn-roof"></div>
            <div className="barn-content">
              <GiFarmTractor className="tractor-icon" />
              <h2>Why Choose Milletio?</h2>
              <p>From our farms to your family, we bring you the goodness of nature's ancient grains.</p>
              <div className="grass-decoration"></div>
            </div>
          </div>

          <div className="feature-card engaging">
            <div className="feature-icon">
              <FaBreadSlice />
            </div>
            <h3>Easy to Make</h3>
            <p>Quick recipes that fit your modern lifestyle.</p>
            <div className="soil-decoration"></div>
          </div>

          <div className="feature-card engaging">
            <div className="feature-icon">
              <FaLeaf />
            </div>
            <h3>No Preservatives</h3>
            <p>Pure goodness with zero artificial additives.</p>
            <div className="soil-decoration"></div>
          </div>

          <div className="feature-card engaging">
            <div className="feature-icon">
              <GiWheat />
            </div>
            <h3>Gluten Free</h3>
            <p>Perfect for sensitive diets without compromise.</p>
            <div className="soil-decoration"></div>
          </div>

          <div className="feature-card engaging">
            <div className="feature-icon">
              <FaHandHoldingHeart />
            </div>
            <h3>Local Sourcing</h3>
            <p>Empowering communities by supporting local farmers.</p>
            <div className="soil-decoration"></div>
          </div>

          <div className="feature-card engaging">
            <div className="feature-icon">
              <FaHeartbeat />
            </div>
            <h3>Health Focused</h3>
            <p>Millets that fuel wellness and vitality.</p>
            <div className="soil-decoration"></div>
          </div>

          <div className="feature-card engaging">
            <div className="feature-icon">
              <FaHistory />
            </div>
            <h3>Ancient Superfood</h3>
            <p>Celebrating timeless nutrition for modern living.</p>
            <div className="soil-decoration"></div>
          </div>
        </div>
      </div>
      
      <div className="sunflower-decoration left"></div>
      <div className="sunflower-decoration right"></div>
    </section>
  );
};

export default WhyChooseMillet;