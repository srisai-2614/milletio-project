import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/ProductDetail.css";
import productData from "./ProductData";
import { useCart } from "../contexts/CartContext";
const ProductDetail = () => {
  const { id } = useParams();
  const product = productData.products[id];
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedTab, setSelectedTab] = useState("description");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  // Handle cases where product is not found
  if (!product) return <div className="product-not-found">Product not found.</div>;

  // Get all media (images and videos)
  const imagesArray = Object.values(product.images || {});
  const allMedia = [...imagesArray];

  // Set initial selected media
  useEffect(() => {
    if (allMedia.length > 0) {
      setSelectedImage(allMedia[0]);
    }
  }, [id]);

  // Handle quantity change
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) setQuantity(value);
  };

  // Handle add to cart
  const handleAddToCart = () => {
    addToCart({...product, id}, quantity);
  };

  // Helper function to determine if media is a video
  const isVideo = (src) => {
    return src && (src.endsWith('.mp4') || src.endsWith('.webm') || src.includes('video'));
  };

  return (
    <div className="product-detail-container">
      <div className="product-detail-inner">
        {/* Left Column - Media Gallery */}
        <div className="product-media-column">
          <div className="media-main-display">
            {isVideo(selectedImage) ? (
              <video controls autoPlay muted>
                <source src={selectedImage} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img src={selectedImage} alt={product.name} className="selected-media" />
            )}
          </div>
          
          <div className="media-thumbnails">
            {allMedia.map((media, idx) => (
              <div 
                key={idx} 
                className={`thumbnail-container ${selectedImage === media ? 'active' : ''}`}
                onClick={() => setSelectedImage(media)}
              >
                {isVideo(media) ? (
                  <div className="video-thumbnail">
                    <img src={product.thumbnail || imagesArray[0]} alt="Video thumbnail" />
                    <span className="video-icon">▶</span>
                  </div>
                ) : (
                  <img src={media} alt={`${product.name} view ${idx + 1}`} />
                )}
              </div>
            ))}
          </div>

          <div className="product-purchase-info">
            <div className="product-title-price">
              <h1>{product.name}</h1>
              <div className="price-container">
                <span className="current-price">₹{product.price.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="product-actions">
              <div className="quantity-selector">
                <button 
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="quantity-btn"
                >
                  -
                </button>
                <input 
                  type="number" 
                  value={quantity} 
                  onChange={handleQuantityChange}
                  min="1"
                />
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>
              
              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                Add to Cart
              </button>
              
              <button className="wishlist-btn">
                <span className="heart-icon">♡</span>
              </button>
            </div>
          </div>
        </div>


        {/* Right Column - Product Information */}
        <div className="product-info-column">
          <div className="product-description">
            <p>{product.description}</p>
          </div>

          {product.highlights && (
            <div className="product-highlights">
              <h3>Highlights</h3>
              <ul>
                {product.highlights.map((highlight, idx) => (
                  <li key={idx}>{highlight}</li>
                ))}
              </ul>
            </div>
          )}
          
          {product.nutritionalInfo && (
            <div className="nutrition-info">
              <h3>Nutritional Information</h3>
              <table className="nutrition-table">
                <thead>
                  <tr>
                    <th>Nutrient</th>
                    <th>Amount (per 100g)</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(product.nutritionalInfo).map(([nutrient, value], idx) => (
                    <tr key={idx}>
                      <td>{nutrient}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {/* Tabbed Information */}
          <div className="product-tabs">
            <div className="tabs-header">
              <button 
                className={`tab-btn ${selectedTab === 'description' ? 'active' : ''}`}
                onClick={() => setSelectedTab('description')}
              >
                Description
              </button>
              <button 
                className={`tab-btn ${selectedTab === 'ingredients' ? 'active' : ''}`}
                onClick={() => setSelectedTab('ingredients')}
              >
                Ingredients
              </button>
              <button 
                className={`tab-btn ${selectedTab === 'usage' ? 'active' : ''}`}
                onClick={() => setSelectedTab('usage')}
              >
                How to Use
              </button>
              <button 
                className={`tab-btn ${selectedTab === 'benefits' ? 'active' : ''}`}
                onClick={() => setSelectedTab('benefits')}
              >
                Benefits
              </button>
            </div>
            
            <div className="tab-content">
              {selectedTab === 'description' && (
                <div className="tab-description">
                  <p>{product.longDescription || product.description}</p>
                </div>
              )}
              
              {selectedTab === 'ingredients' && (
                <div className="tab-ingredients">
                  <h4>Ingredients</h4>
                  <p>{product.ingredients || "100% Pure Product"}</p>
                </div>
              )}
              
              {selectedTab === 'usage' && (
                <div className="tab-usage">
                  <h4>How to Use</h4>
                  <ul>
                    {(product.usageInstructions || ["Use as needed"]).map((instruction, idx) => (
                      <li key={idx}>{instruction}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {selectedTab === 'benefits' && (
                <div className="tab-benefits">
                  <h4>Benefits</h4>
                  <ul className="benefits-list">
                    {(product.benefits || []).map((benefit, idx) => (
                      <li key={idx}>✓ {benefit}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Customer Reviews Section */}
      <div className="customer-reviews-section">
        <h2>Customer Reviews</h2>
        
        {product.reviews && product.reviews.length > 0 ? (
          <div className="reviews-container">
            <div className="reviews-summary">
              <div className="average-rating">
                <span className="rating-number">
                  {(product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length).toFixed(1)}
                </span>
                <div className="rating-stars">
                  {Array(5).fill().map((_, idx) => (
                    <span key={idx} className="star">
                      {idx < Math.round(product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length) ? "★" : "☆"}
                    </span>
                  ))}
                </div>
                <span className="total-reviews">{product.reviews.length} reviews</span>
              </div>
              
              <div className="rating-bars">
                {[5, 4, 3, 2, 1].map(rating => {
                  const count = product.reviews.filter(r => r.rating === rating).length;
                  const percentage = (count / product.reviews.length) * 100;
                  
                  return (
                    <div key={rating} className="rating-bar-container">
                      <span className="rating-label">{rating} star</span>
                      <div className="rating-bar">
                        <div className="rating-fill" style={{ width: `${percentage}%` }}></div>
                      </div>
                      <span className="rating-percentage">{Math.round(percentage)}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="individual-reviews">
              {product.reviews.map((review, idx) => (
                <div key={idx} className="review-card">
                  <div className="review-header">
                    <span className="reviewer-name">{review.user}</span>
                    <div className="review-rating">
                      {Array(5).fill().map((_, i) => (
                        <span key={i} className={`star ${i < review.rating ? 'filled' : ''}`}>
                          {i < review.rating ? "★" : "☆"}
                        </span>
                      ))}
                    </div>
                    <span className="review-date">{review.date || "Verified Purchase"}</span>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                  {review.images && (
                    <div className="review-images">
                      {review.images.map((img, i) => (
                        <img key={i} src={img} alt={`Review by ${review.user}`} />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="no-reviews">
            <p>No reviews yet. Be the first to review this product!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;