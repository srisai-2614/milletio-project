import React from "react";
import "../styles/FeaturedVideo.css"; // Import the CSS file

const FeaturedVideo = () => {
  return (
    <section className="featured-video-section">
      <div className="featured-video-container">
        <h2 className="featured-video-title">
          How to Make a Healthy Millet Noodle Bowl
        </h2>
        <div className="video-wrapper">
          <iframe
            className="responsive-iframe"
            src="https://www.youtube.com/embed/Nn7t7pBzouI?si=gwzBrsYsMxa8A_CS"
            title="Making a Healthy Millet Noodle Bowl"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedVideo;
