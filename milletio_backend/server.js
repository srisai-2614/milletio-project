// server.js - Main server file for order processing
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE, // e.g., 'gmail'
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Verify transporter connection
transporter.verify((error) => {
  if (error) {
    console.error('Email service connection error:', error);
  } else {
    console.log('Email service ready to send messages');
  }
});

// Format currency for emails
const formatCurrency = (amount) => {
  return `₹${parseFloat(amount).toFixed(2)}`;
};

// Generate order confirmation email HTML
const generateOrderConfirmationHTML = (orderData) => {
  const { items, total, shipping, customer, orderDate } = orderData;
  const orderItems = items.map(item => 
    `<tr>
      <td>${item.name}</td>
      <td>${item.weight || 'N/A'}</td>
      <td>${item.quantity}</td>
      <td>${formatCurrency(item.price)}</td>
      <td>${formatCurrency(item.price * item.quantity)}</td>
    </tr>`
  ).join('');

  return `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; }
          .container { max-width: 600px; margin: 0 auto; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
          th { background-color: #f2f2f2; }
          .order-summary { margin-top: 20px; }
          .total-row { font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Order Confirmation</h2>
          <p>Thank you for your order placed on ${new Date(orderDate).toLocaleString()}.</p>
          
          <h3>Order Details:</h3>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Weight</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${orderItems}
            </tbody>
          </table>
          
          <div class="order-summary">
            <p><strong>Subtotal:</strong> ${formatCurrency(total - shipping)}</p>
            <p><strong>Shipping:</strong> ${shipping > 0 ? formatCurrency(shipping) : 'FREE'}</p>
            <p class="total-row"><strong>Total Amount:</strong> ${formatCurrency(total)}</p>
          </div>
          
          <h3>Shipping Information:</h3>
          <p>
            <strong>Name:</strong> ${customer.name}<br>
            <strong>Email:</strong> ${customer.email}<br>
            <strong>Phone:</strong> ${customer.phone}<br>
            <strong>Address:</strong> ${customer.address}<br>
            <strong>City:</strong> ${customer.city}<br>
            <strong>State:</strong> ${customer.state}<br>
            <strong>PIN Code:</strong> ${customer.pincode}<br>
            <strong>Payment Method:</strong> ${customer.paymentMethod === 'cashOnDelivery' ? 'Cash on Delivery' : 'Online Payment'}
          </p>
          
          <p>We'll notify you when your order has been shipped. If you have any questions, please contact our customer service.</p>
          
          <p>Thank you for shopping with us!</p>
        </div>
      </body>
    </html>
  `;
};

// Generate store notification email HTML
const generateStoreNotificationHTML = (orderData) => {
  const { items, total, shipping, customer, orderDate } = orderData;
  const orderItems = items.map(item => 
    `<tr>
      <td>${item.name}</td>
      <td>${item.weight || 'N/A'}</td>
      <td>${item.quantity}</td>
      <td>${formatCurrency(item.price)}</td>
      <td>${formatCurrency(item.price * item.quantity)}</td>
    </tr>`
  ).join('');

  return `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; }
          .container { max-width: 600px; margin: 0 auto; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
          th { background-color: #f2f2f2; }
          .order-summary { margin-top: 20px; }
          .total-row { font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>New Order Received</h2>
          <p>A new order was placed on ${new Date(orderDate).toLocaleString()}.</p>
          
          <h3>Order Details:</h3>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Weight</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${orderItems}
            </tbody>
          </table>
          
          <div class="order-summary">
            <p><strong>Subtotal:</strong> ${formatCurrency(total - shipping)}</p>
            <p><strong>Shipping:</strong> ${shipping > 0 ? formatCurrency(shipping) : 'FREE'}</p>
            <p class="total-row"><strong>Total Amount:</strong> ${formatCurrency(total)}</p>
          </div>
          
          <h3>Customer Information:</h3>
          <p>
            <strong>Name:</strong> ${customer.name}<br>
            <strong>Email:</strong> ${customer.email}<br>
            <strong>Phone:</strong> ${customer.phone}<br>
            <strong>Address:</strong> ${customer.address}<br>
            <strong>City:</strong> ${customer.city}<br>
            <strong>State:</strong> ${customer.state}<br>
            <strong>PIN Code:</strong> ${customer.pincode}<br>
            <strong>Payment Method:</strong> ${customer.paymentMethod === 'cashOnDelivery' ? 'Cash on Delivery' : 'Online Payment'}
          </p>
        </div>
      </body>
    </html>
  `;
};

// API endpoint to process orders
app.post('/api/orders', async (req, res) => {
  try {
    const { order, sendEmailTo } = req.body;
    const storeEmail = sendEmailTo || process.env.STORE_EMAIL;
    
    if (!order || !order.customer || !order.customer.email) {
      return res.status(400).json({ success: false, message: 'Invalid order data' });
    }

    // Generate order number
    const orderNumber = `ORD-${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 1000)}`;
    
    // Send email to store owner
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: storeEmail,
      subject: `New Order #${orderNumber} Received`,
      html: generateStoreNotificationHTML({ ...order, orderNumber }),
    });
    
    // Send confirmation email to customer
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: order.customer.email,
      subject: `Order Confirmation #${orderNumber}`,
      html: generateOrderConfirmationHTML({ ...order, orderNumber }),
    });
    
    // Here you would typically save the order to your database
    
    res.status(200).json({ 
      success: true, 
      message: 'Order processed successfully',
      orderNumber
    });
  } catch (error) {
    console.error('Order processing error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to process order',
      error: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});