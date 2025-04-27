import "../styles/About.css";
import founderImage from "../pages/assets/Article.avif"; // Replace with actual image path

const AboutUs = () => {
  return (
    <section className="about-section">
      <div className="about-heading">
        <h2>About Us</h2>
        <p>
          At Milletio, we believe in empowering healthier lifestyles through
          nutritious millet-based foods. With sustainability and taste at our
          core, we aim to make traditional grains the future of smart eating.
        </p>
      </div>

      <div className="founder-card">
        <div className="founder-image">
          <img src={founderImage} alt="Founder Tharshith Kurapati" />
        </div>
        <div className="founder-content">
          <h3>About the Founder</h3>
          <ul>
            <li>
              🌾 <strong>Visionary Leadership:</strong> Tharshith Kurapati
              started Milletio to make healthy eating effortless and enjoyable.
            </li>
            <li>
              🍽️ <strong>Passion for Nutrition:</strong> Inspired by Indian
              superfoods and modern wellness trends.
            </li>
            <li>
              💪 <strong>Functional Foods:</strong> High-protein, fiber-rich
              millets for busy, health-conscious individuals.
            </li>
            <li>
              🧡 <strong>Crafted with Care:</strong> Every product is made with
              love, quality, and authenticity.
            </li>
            <li>
              🌍 <strong>Mission-Driven:</strong> Making millets a global grain
              and household staple.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
