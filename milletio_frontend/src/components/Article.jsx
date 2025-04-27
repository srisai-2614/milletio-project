import React from "react";
import "../styles/Article.css";
import cover from "../pages/assets/Article.avif";

const Article= () => {
  return (
    <section className="article-section">
      <div className="article-card">
        <div className="article-image">
          <img
            src={cover}// Replace with actual image path
            alt="Power-packed Millets"
          />
        </div>
        <div className="article-content">
          <h2 className="article-title">Power-packed Millets for All</h2>
          <p className="article-info">
            Discover how millets are making a powerful comeback in Hyderabad with initiatives aiming to promote healthy living and sustainability...
          </p>
          <a
            href="https://www.newindianexpress.com/amp/story/cities/hyderabad/2025/Apr/08/power-packed-millets-for-all-at-milletio"
            target="_blank"
            rel="noopener noreferrer"
            className="read-more-btn"
          >
            Read More →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Article;
