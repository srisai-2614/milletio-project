// server.js - Main server file for order processing
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const Razorpay = require('razorpay');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Create Razorpay instance globally
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://yourdomain.com'], // Add your production domain
  credentials: true // Allow credentials
}));
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
  const { items, total, shipping, customer, orderDate, payment, orderNumber } = orderData;
  const orderItems = items.map(item => 
    `<tr>
      <td>${item.name}</td>
      <td>${item.weight || 'N/A'}</td>
      <td>${item.quantity}</td>
      <td>${formatCurrency(item.price)}</td>
      <td>${formatCurrency(item.price * item.quantity)}</td>
    </tr>`
  ).join('');

  const transactionInfo = payment?.transactionId 
    ? `<p><strong>Transaction ID:</strong> ${payment.transactionId}</p>` 
    : '';

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
          <h2>Order Confirmation #${orderNumber}</h2>
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
            <p><strong>Payment Method:</strong> Online Payment (Razorpay)</p>
            ${transactionInfo}
          </div>
          
          <h3>Shipping Information:</h3>
          <p>
            <strong>Name:</strong> ${customer.name}<br>
            <strong>Email:</strong> ${customer.email}<br>
            <strong>Phone:</strong> ${customer.phone}<br>
            <strong>Address:</strong> ${customer.address}<br>
            <strong>City:</strong> ${customer.city}<br>
            <strong>State:</strong> ${customer.state}<br>
            <strong>PIN Code:</strong> ${customer.pincode}
          </p>
          
          <p>We'll notify you when your order has been shipped. If you have any questions, please contact our customer service.</p>
          
          <p>Thank you for shopping with us!</p>
          <p>- Milleti Global Grain</p>
        </div>
      </body>
    </html>
  `;
};

// Generate store notification email HTML
const generateStoreNotificationHTML = (orderData) => {
  const { items, total, shipping, customer, orderDate, payment, orderNumber } = orderData;
  const orderItems = items.map(item => 
    `<tr>
      <td>${item.name}</td>
      <td>${item.weight || 'N/A'}</td>
      <td>${item.quantity}</td>
      <td>${formatCurrency(item.price)}</td>
      <td>${formatCurrency(item.price * item.quantity)}</td>
    </tr>`
  ).join('');

  const transactionInfo = payment?.transactionId 
    ? `<p><strong>Transaction ID:</strong> ${payment.transactionId}</p>` 
    : '';

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
          .action-required { color: #d32f2f; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>New Order Received #${orderNumber}</h2>
          <p class="action-required">ACTION REQUIRED: New order needs to be processed</p>
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
            <p><strong>Payment Method:</strong> Online Payment (Razorpay)</p>
            ${transactionInfo}
          </div>
          
          <h3>Customer Information:</h3>
          <p>
            <strong>Name:</strong> ${customer.name}<br>
            <strong>Email:</strong> ${customer.email}<br>
            <strong>Phone:</strong> ${customer.phone}<br>
            <strong>Address:</strong> ${customer.address}<br>
            <strong>City:</strong> ${customer.city}<br>
            <strong>State:</strong> ${customer.state}<br>
            <strong>PIN Code:</strong> ${customer.pincode}
          </p>
        </div>
      </body>
    </html>
  `;
};

// Create Razorpay order
app.post('/api/payments', async (req, res) => {
  try {
    const { amount, receipt } = req.body;
    
    // Validate amount
    if (!amount || amount <= 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid amount'
      });
    }
    
    const options = {
      amount: Math.round(amount), // amount in paise, ensure it's an integer
      currency: 'INR',
      receipt: receipt,
      payment_capture: 1 // Auto capture
    };
    
    // console.log('Creating Razorpay order with options:', options);
    
    try {
      const order = await razorpay.orders.create(options);
      console.log('Razorpay order created:', order);
      res.status(200).json(order);
    } catch (razorpayError) {
      console.error('Razorpay API error:', razorpayError);
      res.status(500).json({ 
        success: false, 
        message: 'Razorpay API error',
        error: razorpayError.message || 'Unknown Razorpay error'
      });
    }
  } catch (error) {
    console.error('Server error during order creation:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create payment order',
      error: error.message
    });
  }
});

// Verify Razorpay payment
app.post('/api/verify-payment', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required payment verification parameters'
      });
    }
    
    // Create a signature using the order ID and payment ID
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(text)
      .digest('hex');
    
    // console.log('Verifying payment signature...');
    // console.log('Generated Signature:', generatedSignature);
    // console.log('Received Signature:', razorpay_signature);
    
    // Verify signature
    if (generatedSignature === razorpay_signature) {
      console.log('Payment verification successful');
      
      // You can fetch payment details from Razorpay if needed
      try {
        const paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);
        // console.log('Payment details:', paymentDetails);
        // Store payment details in database if needed
      } catch (fetchError) {
        console.error('Error fetching payment details:', fetchError);
        // Continue even if fetch fails, as the payment is verified
      }
      
      res.status(200).json({ 
        success: true, 
        message: 'Payment verified successfully',
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id
      });
    } else {
      // console.log('Payment verification failed - signature mismatch');
      res.status(400).json({ 
        success: false, 
        message: 'Payment verification failed - invalid signature' 
      });
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to verify payment',
      error: error.message
    });
  }
});

// API endpoint to process orders
app.post('/api/orders', async (req, res) => {
  try {
    const { order, sendEmailTo } = req.body;
    
    // Validate order data
    if (!order || !order.customer || !order.customer.email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid order data' 
      });
    }

    // Validate payment info
    if (!order.payment || !order.payment.transactionId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing payment information' 
      });
    }

    // Generate order number
    const orderNumber = `MGG-${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 1000)}`;
    
    // Add order number to order data
    const orderWithNumber = { ...order, orderNumber };
    
    // console.log('Processing order:', orderNumber);
    
    // Set default store email if not provided
    const storeEmail = sendEmailTo || process.env.STORE_EMAIL || 'milletioglobalgrain@gmail.com';
    
    // Send confirmation emails in parallel
    try {
      const emailPromises = [
        // Email to store owner
        transporter.sendMail({
          from: `"Milleti Global Grain" <${process.env.EMAIL_USER}>`,
          to: storeEmail,
          subject: `New Order #${orderNumber} Received`,
          html: generateStoreNotificationHTML(orderWithNumber),
        }),
        
        // Email to customer
        transporter.sendMail({
          from: `"Milleti Global Grain" <${process.env.EMAIL_USER}>`,
          to: order.customer.email,
          subject: `Your Order Confirmation #${orderNumber} - Milleti Global Grain`,
          html: generateOrderConfirmationHTML(orderWithNumber),
        })
      ];
      
      await Promise.all(emailPromises);
      // console.log('All notification emails sent successfully');
    } catch (emailError) {
      console.error('Error sending emails:', emailError);
      // Continue processing even if emails fail
    }
    
    // Here you would typically save the order to your database
    // Example MongoDB code:
    // const newOrder = new Order(orderWithNumber);
    // await newOrder.save();
    
    // Return success response with order number
    res.status(200).json({ 
      success: true, 
      message: 'Order processed successfully',
      orderNumber
    });
  } catch (error) {
    // console.error('Order processing error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to process order',
      error: error.message
    });
  }
});

// Add a health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Server ready to handle payments and orders`);
});