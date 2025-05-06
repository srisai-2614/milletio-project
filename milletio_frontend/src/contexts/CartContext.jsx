import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';

// Create context
const CartContext = createContext();

// Toast component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Auto close after 3 seconds
    
    return () => clearTimeout(timer);
  }, [onClose]);
  
  return (
    <div className={`toast toast-${type}`} style={{
      position: 'fixed',
      top: '20px',
      left: '20px',
      backgroundColor: type === 'success' ? '#4CAF50' : '#f44336',
      color: 'white',
      padding: '15px',
      borderRadius: '4px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      zIndex: 1000,
      minWidth: '250px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <span>{message}</span>
      <button 
        onClick={onClose}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'white',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        ×
      </button>
    </div>
  );
};

// Initial state
const initialState = {
  cartItems: [],
  cartTotal: 0,
  itemCount: 0,
  shippingCharge: 0
};

// Actions
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
const CLEAR_CART = 'CLEAR_CART';

// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const newItem = action.payload;
      const existingItemIndex = state.cartItems.findIndex(item => item.id === newItem.id);
      
      let updatedCartItems;
      
      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        updatedCartItems = state.cartItems.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + (newItem.quantity || 1) }
            : item
        );
      } else {
        // Add new item
        updatedCartItems = [...state.cartItems, { ...newItem, quantity: newItem.quantity || 1 }];
      }
      
      // Calculate new total and count
      const newTotal = updatedCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const newCount = updatedCartItems.reduce((sum, item) => sum + item.quantity, 0);
      
      // Calculate shipping charge - free if total >= 499
      const shippingCharge = newTotal < 499 ? 50 : 0;
      
      return {
        ...state,
        cartItems: updatedCartItems,
        cartTotal: newTotal,
        itemCount: newCount,
        shippingCharge
      };
    }
    
    case REMOVE_FROM_CART: {
      const updatedCartItems = state.cartItems.filter(item => item.id !== action.payload);
      
      // Calculate new total and count
      const newTotal = updatedCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const newCount = updatedCartItems.reduce((sum, item) => sum + item.quantity, 0);
      
      // Calculate shipping charge - free if total >= 499
      const shippingCharge = newTotal < 499 ? 50 : 0;
      
      return {
        ...state,
        cartItems: updatedCartItems,
        cartTotal: newTotal,
        itemCount: newCount,
        shippingCharge
      };
    }
    
    case UPDATE_QUANTITY: {
      const { id, quantity } = action.payload;
      
      if (quantity <= 0) {
        // If quantity is 0 or negative, remove the item
        return cartReducer(state, { type: REMOVE_FROM_CART, payload: id });
      }
      
      const updatedCartItems = state.cartItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      );
      
      // Calculate new total and count
      const newTotal = updatedCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const newCount = updatedCartItems.reduce((sum, item) => sum + item.quantity, 0);
      
      // Calculate shipping charge - free if total >= 499
      const shippingCharge = newTotal < 499 ? 50 : 0;
      
      return {
        ...state,
        cartItems: updatedCartItems,
        cartTotal: newTotal,
        itemCount: newCount,
        shippingCharge
      };
    }
    
    case CLEAR_CART:
      return initialState;
      
    default:
      return state;
  }
};

// Provider component
export const CartProvider = ({ children }) => {
  // Load cart from localStorage if available
  const savedCart = localStorage.getItem('cart') 
    ? JSON.parse(localStorage.getItem('cart')) 
    : initialState;
  
  const [state, dispatch] = useReducer(cartReducer, savedCart);
  
  // Toast state
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success'
  });
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);
  
  // Hide toast function
  const hideToast = () => {
    setToast({ ...toast, show: false });
  };
  
  // Show toast function
  const showToast = (message, type = 'success') => {
    setToast({
      show: true,
      message,
      type
    });
  };
  
  // Action creators
  const addToCart = (product, quantity = 1) => {
    dispatch({
      type: ADD_TO_CART,
      payload: { ...product, quantity }
    });
    
    // Show toast notification
    const isExisting = state.cartItems.some(item => item.id === product.id);
    const message = isExisting 
      ? `${product.name || 'Item'}'s quantity updated in cart`
      : `${product.name || 'Item'} added to cart`;
    
    showToast(message, 'success');
  };
  
  const removeFromCart = (productId) => {
    // Find the product first to reference in toast message
    const product = state.cartItems.find(item => item.id === productId);
    
    dispatch({
      type: REMOVE_FROM_CART,
      payload: productId
    });
    
    if (product) {
      showToast(`${product.name || 'Item'} removed from cart`, 'success');
    }
  };
  
  const updateQuantity = (productId, quantity) => {
    dispatch({
      type: UPDATE_QUANTITY,
      payload: { id: productId, quantity }
    });
  };
  
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
    showToast('Cart has been cleared', 'success');
  };
  
  return (
    <CartContext.Provider value={{
      ...state,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};