import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/OrderConfirmation.css';

const OrderConfirmation = () => {
  const location = useLocation();
  const orderData = location.state?.orderData;
  
  // If someone navigates directly to this page without order data, redirect to home
  if (!orderData) {
    return <Navigate to="/" replace />;
  }
  
  const { items, total, shipping, customer } = orderData;
  
  // Generate a random order ID
  const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  
  return (
    <div className="order-confirmation-container">
      <motion.div 
        className="order-confirmation-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="order-success-header">
          <motion.div 
            className="success-icon"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </motion.div>
          <h2>Order Placed Successfully!</h2>
          <p>Thank you for your purchase, {customer.name}!</p>
          <p className="order-id">Order ID: {orderId}</p>
        </div>
        
        <div className="order-details-section">
          <h3>Order Details</h3>
          <div className="order-items-list">
            {items.map(item => (
              <div key={item.id} className="confirmation-order-item">
                <div className="confirmation-item-info">
                  <p>{item.name} × {item.quantity}</p>
                  <p>₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="order-summary-totals">
            <div className="total-row">
              <span>Subtotal:</span>
              <span>₹{(total - shipping).toFixed(2)}</span>
            </div>
            
            <div className="total-row">
              <span>Shipping:</span>
              <span>{shipping > 0 ? `₹${shipping.toFixed(2)}` : 'FREE'}</span>
            </div>
            
            <div className="total-row grand-total">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="shipping-details-section">
          <h3>Shipping Details</h3>
          <p>{customer.name}</p>
          <p>{customer.address}</p>
          <p>{customer.city}, {customer.state} - {customer.pincode}</p>
          <p>Phone: {customer.phone}</p>
          <p>Email: {customer.email}</p>
        </div>
        
        <div className="payment-details-section">
          <h3>Payment Method</h3>
          <p>{customer.paymentMethod === 'cashOnDelivery' ? 'Cash on Delivery' : 'Online Payment'}</p>
        </div>
        
        <div className="order-actions">
          <Link to="/" className="back-to-home-btn">Back to Home</Link>
          <Link to="/products" className="continue-shopping-btn">Continue Shopping</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderConfirmation;