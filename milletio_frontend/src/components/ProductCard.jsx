import { Link } from "react-router-dom";
import "../styles/ProductCard.css";
import { motion } from "framer-motion";
import { useCart } from "../contexts/CartContext";

const ProductCard = ({ id, product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart({ ...product, id });
  };
  
  return (
    <motion.div
      className="product-card-rectangle"
      whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link to={`/product/${id}`}>
        <div className="product-card-image">
          <img src={product.images.front} alt={product.name} className="product-img" />
        </div>
      </Link>
      <div className="product-card-body">
        <h3 className="product-title">{product.name}</h3>
        <div className="product-price">
          ₹{product.price} 
        </div>
        <p className="product-description">{product.description}</p>
        <div className="product-actions">
          <button onClick={handleAddToCart} className="btn add-to-cart">Add to Cart</button>
          <Link to={`/product/${id}`} className="btn customize-btn">Customize</Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;