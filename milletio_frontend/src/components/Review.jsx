import React, { useState, useRef, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";
import "../styles/Review.css";
import { DefaultMaleAvatar, DefaultFemaleAvatar, DefaultUnknownAvatar } from "../data/ReviewData";
import ReviewData from "../data/ReviewData";

const TestimonialCarousel = () => {
  const carouselRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  
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
  
  // Calculate visible slides based on container width
  const getVisibleSlides = () => {
    if (!carouselRef.current) return 1;
    
    const containerWidth = carouselRef.current.clientWidth;
    if (containerWidth < 600) return 1;
    if (containerWidth < 900) return 2;
    return 3;
  };
  
  const scroll = (direction) => {
    if (carouselRef.current) {
      const { current } = carouselRef;
      
      // Calculate card width including gap
      const cardWidth = current.querySelector('.testimonial-card').offsetWidth;
      const gap = 16; // 1rem converted to px
      const scrollAmount = direction === 'left' ? -(cardWidth + gap) : (cardWidth + gap);
      
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      
      // Update current slide
      const newPosition = current.scrollLeft + scrollAmount;
      const totalWidth = cardWidth + gap;
      const newSlide = Math.round(newPosition / totalWidth);
      setCurrentSlide(newSlide < 0 ? 0 : newSlide);
    }
  };

  // Handle direct navigation to a specific slide
  const goToSlide = (index) => {
    if (carouselRef.current) {
      const { current } = carouselRef;
      const cardWidth = current.querySelector('.testimonial-card').offsetWidth;
      const gap = 16; // 1rem converted to px
      const scrollPosition = index * (cardWidth + gap);
      
      current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
      setCurrentSlide(index);
    }
  };

  // Update button visibility based on scroll position
  const handleScroll = () => {
    if (carouselRef.current) {
      const { current } = carouselRef;
      
      // Show left button if not at the start
      setShowLeftButton(current.scrollLeft > 10);
      
      // Show right button if not at the end
      const isAtEnd = current.scrollLeft + current.clientWidth >= current.scrollWidth - 10;
      setShowRightButton(!isAtEnd);
      
      // Update current slide
      const cardWidth = current.querySelector('.testimonial-card').offsetWidth;
      const gap = 16; // 1rem converted to px
      const newSlide = Math.round(current.scrollLeft / (cardWidth + gap));
      setCurrentSlide(newSlide < 0 ? 0 : newSlide);
    }
  };

  // Touch event handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe && showRightButton) {
      scroll('right');
    } else if (isRightSwipe && showLeftButton) {
      scroll('left');
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Add scroll event listener
  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
      // Initialize button states
      handleScroll();
      
      // Handle window resize
      const handleResize = () => {
        handleScroll();
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        carousel.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  // Create pagination dots based on number of slides
  const renderPaginationDots = () => {
    if (!carouselRef.current) return null;
    
    const visibleSlides = getVisibleSlides();
    const totalSlides = topReviews.length;
    const totalDots = Math.ceil(totalSlides - (visibleSlides - 1));
    
    return (
      <div className="pagination-dots">
        {Array.from({ length: totalDots }).map((_, index) => (
          <button 
            key={index}
            className={`pagination-dot ${currentSlide === index ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    );
  };

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
        
        <div 
          className="testimonials-carousel" 
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {topReviews.map((review, index) => {
            const Avatar = review.image || getAvatar(review.gender);
            return (
              <div key={index} className="testimonial-card">
                <div className="img-container">
                  <div className="person-img">
                    {typeof Avatar === 'function' ? <Avatar /> : <img src={Avatar} alt={`${review.user}`} />}
                  </div>
                  {/* <span className="quote-icon">
                    <FaQuoteRight />
                  </span> */}
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
            );
          })}
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
      
      {renderPaginationDots()}
    </section>
  );
};

export default TestimonialCarousel;