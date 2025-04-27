import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/BestProducts.css";
import { useCart } from "../contexts/CartContext";

const BestSellersSection = ({ products }) => {
  const { addToCart } = useCart();
  const bestSellers = products.slice(0, 4);
  
  const handleAddToCart = (product) => {
    addToCart(product);
  };
  
  return (
    <section className="best-sellers-section">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Our Best Sellers
      </motion.h2>
      
      <div className="best-seller-scroll-container">
        {bestSellers.map((product, index) => (
          <motion.div 
            key={product.id} 
            className="best-seller-card"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 10px 20px rgba(0,0,0,0.15)" 
            }}
          >
            {product.discount && (
              <motion.span 
                className="badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                {product.discount}% OFF
              </motion.span>
            )}
            
            <div className="best-seller-image-wrapper">
              <Link to={`/product/${product.id}`}>
                {product.images?.front && (
                  <motion.img 
                    src={product.images.front} 
                    alt={product.name} 
                    className="best-seller-image front"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  />
                )}
                
                {product.images?.back && (
                  <motion.img 
                    src={product.images.back} 
                    alt={`${product.name} - alternate view`} 
                    className="best-seller-image back"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  />
                )}
              </Link>
            </div>
            
            <div className="best-seller-details">
              <motion.h3 
                className="best-seller-title"
                whileHover={{ color: "#2b8a3e" }}
              >
                {product.name}
              </motion.h3>
              
              <motion.p className="best-seller-price">
                ₹{product.price}
              </motion.p>
              
              <p className="best-seller-rating">
                {product.weight}
              </p>
              
              <div className="best-seller-actions">
                <motion.button 
                  className="best-seller-btn add-btn"
                  onClick={() => handleAddToCart(product)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Add to Cart
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BestSellersSection;