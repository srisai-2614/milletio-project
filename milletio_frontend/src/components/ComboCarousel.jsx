import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import '../styles/ComboCarousel.css';

const ComboCarousel = ({ combos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addToCart } = useCart();

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % combos.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + combos.length) % combos.length);
  };

  const currentCombo = combos[currentIndex];

  // Function to add the entire combo to cart
  const handleAddComboToCart = () => {
    // Add combo as a single product
    const comboProduct = {
      id: `combo-${currentCombo.id}`, // Ensure unique ID for the combo
      name: currentCombo.name,
      price: currentCombo.price,
      image: currentCombo.components[0]?.image || '', // Use first component image as combo image
      weight: `${currentCombo.components.length} items`, // Show how many items in the combo
      type: 'combo',
      quantity: 1,
      components: currentCombo.components
    };
    
    addToCart(comboProduct);
  };

  return (
    <div className="combo-carousel">
      <div className="carousel-container">
        <button className="carousel-arrow carousel-arrow-left" onClick={prevSlide}>
          &lt;
        </button>
        
        <div className="combo-slide">
          <div className="combo-header">
            <h2>{currentCombo.name}</h2>
            <div className="combo-pricing">
              <span className="combo-price">₹{currentCombo.price}</span>
              <span className="combo-regular-price">₹{currentCombo.regularPrice}</span>
            </div>
          </div>
          
          <div className="combo-content">
            <div className="saving-badge">Save {currentCombo.savingPercentage}%</div>
            
            <div className="combo-description">
              <p>{currentCombo.description}</p>
            </div>
            
            <div className="combo-products">
              <h3>What's included:</h3>
              <div className="products-grid">
                {currentCombo.components.map((component, index) => (
                  <div key={`component-${currentCombo.id}-${component.id || index}`} className="product-item">
                    <div className="product-image-container">
                      <img 
                        src={component.image} 
                        alt={component.name} 
                        className="product-image" 
                      />
                    </div>
                    <div className="product-details">
                      <p className="product-name">{component.name}</p>
                      <p className="product-price">₹{component.regularPrice}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {currentCombo.freeItems && currentCombo.freeItems.length > 0 && (
                <div className="free-items-section">
                  <h3>Free with this combo:</h3>
                  <div className="free-items-grid">
                    {currentCombo.freeItems.map((item, index) => (
                      <div key={`free-item-${currentCombo.id}-${item.id || index}`} className="free-item">
                        <div className="free-item-image-container">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="free-item-image" 
                          />
                          <span className="free-badge">FREE</span>
                        </div>
                        <div className="free-item-details">
                          <p className="free-item-name">{item.name}</p>
                          <p className="free-item-price">Worth ₹{item.regularPrice}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="combo-actions">
                <p className="savings-text">Save ₹{currentCombo.regularPrice - currentCombo.price} on this combo!</p>
                <button className="add-to-cart-btn" onClick={handleAddComboToCart}>Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
        
        <button className="carousel-arrow carousel-arrow-right" onClick={nextSlide}>
          &gt;
        </button>
      </div>
      
      <div className="carousel-dots">
        {combos.map((combo, index) => (
          <span 
            key={`dot-${combo.id || index}`} 
            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ComboCarousel;