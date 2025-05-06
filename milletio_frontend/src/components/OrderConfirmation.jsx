import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/OrderConfirmation.css';

const OrderConfirmation = () => {
  const location = useLocation();
  const { orderData, orderNumber } = location.state || {};

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
    
    // If no order data is found, redirect to home
    if (!orderData && !orderNumber) {
      // You could redirect here or show an error message
      console.error('No order data found');
    }
  }, [orderData, orderNumber]);

  // If no order data is available, show an error message
  if (!orderData || !orderNumber) {
    return (
      <div className="order-confirmation-container">
        <div className="confirmation-error">
          <h2>Order Information Not Found</h2>
          <p>We couldn't find information about your order. Please check your email for order confirmation or contact customer support.</p>
          <Link to="/" className="back-home-btn">Return to Home</Link>
        </div>
      </div>
    );
  }

  const { items, total, shipping, customer, payment } = orderData;
  const formattedDate = new Date().toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.div 
      className="order-confirmation-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="confirmation-header">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          className="success-icon"
        >
          ✓
        </motion.div>
        <h2>Order Confirmed!</h2>
        <p>Thank you for your purchase, {customer.name}</p>
      </div>

      <div className="order-details">
        <div className="order-info-section">
          <h3>Order Information</h3>
          <p><strong>Order Number:</strong> #{orderNumber}</p>
          <p><strong>Date:</strong> {formattedDate}</p>
          <p><strong>Payment Method:</strong> Online Payment (Razorpay)</p>
          {payment?.transactionId && (
            <p><strong>Transaction ID:</strong> {payment.transactionId}</p>
          )}
        </div>

        <div className="shipping-info-section">
          <h3>Shipping Details</h3>
          <p>{customer.name}</p>
          <p>{customer.address}</p>
          <p>{customer.city}, {customer.state} - {customer.pincode}</p>
          <p>{customer.phone}</p>
          <p>{customer.email}</p>
        </div>
      </div>

      <div className="order-items-summary">
        <h3>Order Summary</h3>
        <div className="ordered-items">
          {items.map(item => (
            <div key={item.id} className="ordered-item">
              <div className="item-image">
                <img src={item.images?.front || item.image} alt={item.name} />
              </div>
              <div className="item-details">
                <h4>{item.name}</h4>
                <p className="item-weight">{item.weight}</p>
                <p className="item-quantity">Qty: {item.quantity}</p>
              </div>
              <p className="item-price">₹{(item.price * item.quantity).toFixed(2)}</p>
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

      <div className="confirmation-actions">
        <p>A confirmation email has been sent to <strong>{customer.email}</strong>.</p>
        <Link to="/" className="back-home-btn">Continue Shopping</Link>
      </div>
    </motion.div>
  );
};

export default OrderConfirmation;