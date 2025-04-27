import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from "../contexts/CartContext";
import '../styles/Cart.css';

const Cart = () => {
  const { cartItems, cartTotal, itemCount, shippingCharge, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isCheckout, setIsCheckout] = useState(false);
  const [orderProcessing, setOrderProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cashOnDelivery' // Add default payment method
  });
  const navigate = useNavigate();

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(id, parseInt(newQuantity));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setOrderProcessing(true);
    
    try {
      // Prepare order data
      const orderData = {
        items: cartItems,
        total: cartTotal + shippingCharge,
        shipping: shippingCharge,
        customer: formData,
        orderDate: new Date().toISOString()
      };
      
      // Send order data to your backend API
      const response = await fetch('http://localhost:3001/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order: orderData,
          sendEmailTo: 'bollavaramnarasimha@gmail.com' // Replace with your store's email
        }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Order could not be processed');
      }
      
      // Order successfully placed
      alert('Order placed successfully! A confirmation has been sent to your email.');
      clearCart();
      navigate('/order-confirmation', { state: { orderData, orderNumber: result.orderNumber } });
    } catch (error) {
      alert('There was an error processing your order. Please try again.');
      console.error('Order error:', error);
    } finally {
      setOrderProcessing(false);
    }
  };

  // Empty cart view
  if (cartItems.length === 0) {
    return (
      <div className="cart-container empty-cart">
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added any products to your cart yet.</p>
        <Link to="/products" className="continue-shopping-btn">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Cart ({itemCount} items)</h2>
      
      {!isCheckout ? (
        <>
          <div className="cart-items">
            <AnimatePresence>
              {cartItems.map(item => (
                <motion.div 
                  key={item.id} 
                  className="cart-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="cart-item-image">
                    <img src={item.images?.front || item.image} alt={item.name} />
                  </div>
                  
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p className="item-weight">{item.weight}</p>
                    <p className="item-price">₹{item.price}</p>
                  </div>
                  
                  <div className="cart-item-actions">
                    <div className="quantity-control">
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <input 
                        type="number" 
                        min="1" 
                        value={item.quantity} 
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      />
                      <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                        +
                      </button>
                    </div>
                    
                    <p className="item-total">₹{(item.price * item.quantity).toFixed(2)}</p>
                    
                    <button 
                      className="remove-item-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      ×
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          <div className="cart-summary">
            <div className="cart-totals">
              <div className="total-row">
                <span>Subtotal:</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              
              <div className="total-row">
                <span>Shipping:</span>
                <span>{shippingCharge > 0 ? `₹${shippingCharge.toFixed(2)}` : 'FREE'}</span>
              </div>
              
              {shippingCharge > 0 && (
                <div className="shipping-note">
                  Add ₹{(499 - cartTotal).toFixed(2)} more to get FREE shipping!
                </div>
              )}
              
              <div className="total-row grand-total">
                <span>Total:</span>
                <span>₹{(cartTotal + shippingCharge).toFixed(2)}</span>
              </div>
            </div>
            
            <div className="cart-actions">
              <Link to="/products" className="continue-shopping-btn">Continue Shopping</Link>
              <button className="proceed-to-checkout-btn" onClick={() => setIsCheckout(true)}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="checkout-container">
          <div className="checkout-form-container">
            <h3>Shipping Information</h3>
            <form onSubmit={handleCheckout} className="checkout-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="pincode">PIN Code</label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Payment Method</label>
                <div className="payment-options">
                  <div className="payment-option">
                    <input
                      type="radio"
                      id="cashOnDelivery"
                      name="paymentMethod"
                      value="cashOnDelivery"
                      checked={formData.paymentMethod === 'cashOnDelivery'}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="cashOnDelivery">Cash on Delivery</label>
                  </div>
                  
                  <div className="payment-option">
                    <input
                      type="radio"
                      id="onlinePayment"
                      name="paymentMethod"
                      value="onlinePayment"
                      checked={formData.paymentMethod === 'onlinePayment'}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="onlinePayment">Online Payment</label>
                  </div>
                </div>
              </div>
              
              <div className="checkout-buttons">
                <button 
                  type="button" 
                  className="back-to-cart-btn"
                  onClick={() => setIsCheckout(false)}
                >
                  Back to Cart
                </button>
                <button 
                  type="submit" 
                  className="place-order-btn"
                  disabled={orderProcessing}
                >
                  {orderProcessing ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            </form>
          </div>
          
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="order-items">
              {cartItems.map(item => (
                <div key={item.id} className="order-item">
                  <div className="order-item-info">
                    <span>{item.name} × {item.quantity}</span>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="order-totals">
              <div className="total-row">
                <span>Subtotal:</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              
              <div className="total-row">
                <span>Shipping:</span>
                <span>{shippingCharge > 0 ? `₹${shippingCharge.toFixed(2)}` : 'FREE'}</span>
              </div>
              
              <div className="total-row grand-total">
                <span>Total:</span>
                <span>₹{(cartTotal + shippingCharge).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;