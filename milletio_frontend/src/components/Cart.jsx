import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from "../contexts/CartContext";
import '../styles/Cart.css';

const Cart = () => {
  const { cartItems, cartTotal, itemCount, shippingCharge, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isCheckout, setIsCheckout] = useState(false);
  const [orderProcessing, setOrderProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'online' // Default payment method as online
  });
  const navigate = useNavigate();

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

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

  // Function to initialize Razorpay payment
  const initializeRazorpayPayment = async () => {
    setPaymentError(null);
    
    return new Promise(async (resolve, reject) => {
      try {
        // Make sure Razorpay is loaded
        if (!window.Razorpay) {
          throw new Error("Razorpay SDK failed to load. Please check your internet connection.");
        }
        
        // console.log("Creating Razorpay order...");
        
        // Create order on your backend
        const response = await fetch('http://localhost:3001/api/payments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: Math.round((cartTotal + shippingCharge) * 100), // Razorpay expects amount in paise
            receipt: `receipt_${Date.now()}`
          }),
          credentials: 'include' // Include credentials to handle CORS issues
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Order creation failed:", errorData);
          throw new Error(errorData.message || 'Failed to create payment order');
        }
        
        const result = await response.json();
        // console.log("Order created successfully:", result);
        
        // Use environment variable or fallback for key
        const key = import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_live_mfd5n48kLJDkSU"; // Replace with your actual key
        
        // Configure Razorpay options
        const options = {
          key: key,
          amount: Math.round((cartTotal + shippingCharge) * 100), // Amount in paise
          currency: 'INR',
          name: 'Milleti Global Grain',
          description: 'Order Payment',
          order_id: result.id,
          handler: async function (response) {
            // console.log("Payment successful, verifying...", response);
            try {
              // Verify payment on backend
              const verifyResponse = await fetch('http://localhost:3001/api/verify-payment', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature
                }),
                credentials: 'include' // Include credentials for CORS
              });
              
              if (!verifyResponse.ok) {
                const errorData = await verifyResponse.json();
                throw new Error(errorData.message || 'Payment verification failed');
              }
              
              const verifyResult = await verifyResponse.json();
              
              if (!verifyResult.success) {
                throw new Error('Payment verification failed');
              }
              
              // console.log("Payment verified successfully");
              
              // Handle successful payment
              resolve({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature
              });
            } catch (error) {
              console.error("Payment verification error:", error);
              setPaymentError(error.message);
              reject(error);
            }
          },
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.phone
          },
          notes: {
            address: formData.address
          },
          theme: {
            color: '#3399cc'
          },
          modal: {
            ondismiss: function() {
              setPaymentError("Payment cancelled");
              reject(new Error('Payment cancelled by user'));
            }
          }
        };
        
        // console.log("Initializing Razorpay with options:", options);
        
        // Initialize Razorpay
        const razorpay = new window.Razorpay(options);
        razorpay.on('payment.failed', function (response) {
          setPaymentError(`Payment failed: ${response.error.description}`);
          reject(new Error(`Payment failed: ${response.error.description}`));
        });
        
        razorpay.open();
      } catch (error) {
        console.error('Razorpay initialization error:', error);
        setPaymentError(error.message);
        reject(error);
      }
    });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setOrderProcessing(true);
    setPaymentError(null);
    
    try {
      // console.log("Starting checkout process...");
      
      // Process payment with Razorpay
      let paymentData;
      try {
        paymentData = await initializeRazorpayPayment();
      } catch (error) {
        console.error('Payment failed:', error);
        setPaymentError(error.message || 'Payment failed or was cancelled');
        setOrderProcessing(false);
        return;
      }
      
      // Prepare order data with payment info
      const orderData = {
        items: cartItems,
        total: cartTotal + shippingCharge,
        shipping: shippingCharge,
        customer: formData,
        orderDate: new Date().toISOString(),
        payment: {
          method: 'razorpay',
          transactionId: paymentData.razorpay_payment_id,
          orderId: paymentData.razorpay_order_id,
          signature: paymentData.razorpay_signature
        }
      };
      
      // console.log("Processing order with data:", orderData);
      
      // Send order data to your backend API
      const response = await fetch('http://localhost:3001/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order: orderData,
          sendEmailTo: 'milletioglobalgrain@gmail.com' // Replace with your store's email
        }),
        credentials: 'include' // Include credentials for CORS
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Order could not be processed');
      }
      
      const result = await response.json();
      // console.log("Order processed successfully:", result);
      
      // Add the order number to the order data
      const orderWithNumber = { 
        ...orderData, 
        orderNumber: result.orderNumber 
      };
      
      // Order successfully placed - clear cart and redirect
      clearCart();
      
      // Redirect to order confirmation page with order data
      navigate('/order-confirmation', { 
        state: { 
          orderData: orderWithNumber, 
          orderNumber: result.orderNumber 
        } 
      });
    } catch (error) {
      setPaymentError(error.message || 'There was an error processing your order');
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
      
      {paymentError && (
        <div className="payment-error-alert">
          <p>{paymentError}</p>
          <button onClick={() => setPaymentError(null)}>×</button>
        </div>
      )}
      
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
              
              <div className="form-group payment-method-info">
                <h4>Payment Method: Online Payment (Razorpay)</h4>
                <p>Secure online payment through Razorpay. You'll be redirected to complete your payment after clicking "Place Order".</p>
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
                  {orderProcessing ? 'Processing...' : 'Place Order & Pay'}
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