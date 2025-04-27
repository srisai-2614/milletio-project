import React, { useState, useRef, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";
import "../styles/Review.css";
import { DefaultMaleAvatar, DefaultFemaleAvatar, DefaultUnknownAvatar } from "../data/ReviewData";
import ReviewData from "../data/ReviewData";

// This component collects top reviews from across all products
const TestimonialCarousel = () => {
  const carouselRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  // Sort reviews by rating (highest first) and then take top 10
  const topReviews = ReviewData
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10);
    
  const image_selection = {
    male: DefaultMaleAvatar,
    female: DefaultFemaleAvatar,
    unknown: DefaultUnknownAvatar
  };
  
  // Get appropriate avatar based on gender
  const getAvatar = (gender) => {
    return image_selection[gender] || DefaultUnknownAvatar;    
  };
  
  const scroll = (direction) => {
    if (carouselRef.current) {
      const { current } = carouselRef;
      const scrollAmount = direction === 'left' ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Update button visibility based on scroll position
  const handleScroll = () => {
    if (carouselRef.current) {
      const { current } = carouselRef;
      
      // Show left button if not at the start
      setShowLeftButton(current.scrollLeft > 0);
      
      // Show right button if not at the end
      const isAtEnd = current.scrollLeft + current.clientWidth >= current.scrollWidth - 10;
      setShowRightButton(!isAtEnd);
    }
  };

  // Add scroll event listener
  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
      // Initialize button states
      handleScroll();
      
      return () => {
        carousel.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return (
    <section className="testimonials-section">
      <div className="section-title">
        <h2>What Our Customers Say</h2>
        <div className="underline"></div>
      </div>
      
      <div className="carousel-container">
        {showLeftButton && (
          <button 
            className="carousel-btn prev-btn"
            onClick={() => scroll('left')}
            aria-label="Previous testimonials"
          >
            <FaChevronLeft />
          </button>
        )}
        
        <div className="testimonials-carousel" ref={carouselRef}>
          {topReviews.map((review, index) => (
            <div key={index} className="testimonial-card">
              <div className="img-container">
              <div className="person-img">
  {(review.image || getAvatar(review.gender))()}
</div>
                <span className="quote-icon">
                </span>
              </div>
              <h4 className="author">{review.user}</h4>
              <p className="job">{review.productName}</p>
              <div className="rating">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < review.rating ? "star filled" : "star"}>
                    ★
                  </span>
                ))}
              </div>
              <p className="info">{review.comment}</p>
            </div>
          ))}
        </div>
        
        {showRightButton && (
          <button 
            className="carousel-btn next-btn"
            onClick={() => scroll('right')}
            aria-label="Next testimonials"
          >
            <FaChevronRight />
          </button>
        )}
      </div>
    </section>
  );
};

export default TestimonialCarousel;