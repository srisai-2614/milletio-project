import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import '../styles/CartIcon.css';

const CartIcon = () => {
  const { itemCount } = useCart();
  
  return (
    <Link to="/cart" className="cart-icon-container">
      <motion.div 
        className="cart-icon"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        
        {itemCount > 0 && (
          <motion.span 
            className="cart-counter"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            key={itemCount}
          >
            {itemCount}
          </motion.span>
        )}
      </motion.div>
    </Link>
  );
};

export default CartIcon;