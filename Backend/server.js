const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Database setup
const db = new sqlite3.Database('./forge.db');

// Create tables with updated schema
db.serialize(() => {
  // Subscriptions table with status tracking
  db.run(`CREATE TABLE IF NOT EXISTS subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    plan TEXT NOT NULL,
    payment_method TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    payment_status TEXT DEFAULT 'unpaid',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Users table for authentication
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Newsletter subscribers
  db.run(`CREATE TABLE IF NOT EXISTS newsletter (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    interests TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Order status history
  db.run(`CREATE TABLE IF NOT EXISTS order_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    status TEXT NOT NULL,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES subscriptions(id)
  )`);
});

// ==================== CUSTOMER ENDPOINTS ====================

// Create new subscription
app.post('/subscribe', (req, res) => {
  const { name, email, phone, address, plan, paymentMethod } = req.body;
  
  db.run(
    `INSERT INTO subscriptions (name, email, phone, address, plan, payment_method, status, payment_status) 
     VALUES (?, ?, ?, ?, ?, ?, 'pending', 'unpaid')`,
    [name, email, phone, address, plan, paymentMethod],
    function(err) {
      if (err) {
        console.error(err);
        return res.json({ success: false, error: err.message });
      }
      
      const orderId = this.lastID;
      
      // Log initial status
      db.run(
        'INSERT INTO order_history (order_id, status, notes) VALUES (?, ?, ?)',
        [orderId, 'pending', 'Order created']
      );
      
      res.json({ 
        success: true, 
        orderId: orderId,
        message: 'Order received! We will contact you shortly.' 
      });
    }
  );
});

// Get customer orders by email
app.get('/customer/orders', (req, res) => {
  const { email } = req.query;
  
  if (!email) {
    return res.status(400).json({ error: 'Email required' });
  }
  
  db.all(
    'SELECT * FROM subscriptions WHERE email = ? ORDER BY created_at DESC',
    [email],
    (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      res.json({ orders: rows });
    }
  );
});

// Newsletter signup
app.post('/newsletter/subscribe', (req, res) => {
  const { name, email, interests } = req.body;
  
  db.run(
    'INSERT INTO newsletter (name, email, interests) VALUES (?, ?, ?)',
    [name, email, JSON.stringify(interests || [])],
    (err) => {
      if (err) {
        if (err.message.includes('UNIQUE constraint')) {
          return res.json({ success: false, error: 'Email already subscribed' });
        }
        return res.json({ success: false, error: err.message });
      }
      res.json({ success: true, message: 'Subscribed successfully!' });
    }
  );
});

// ==================== ADMIN ENDPOINTS ====================

// Get all orders (admin)
app.get('/admin/orders', (req, res) => {
  db.all(
    'SELECT * FROM subscriptions ORDER BY created_at DESC',
    [],
    (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      res.json({ orders: rows });
    }
  );
});

// Get single order details (admin)
app.get('/admin/orders/:id', (req, res) => {
  const { id } = req.params;
  
  db.get(
    'SELECT * FROM subscriptions WHERE id = ?',
    [id],
    (err, order) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      
      // Get order history
      db.all(
        'SELECT * FROM order_history WHERE order_id = ? ORDER BY created_at DESC',
        [id],
        (err, history) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          
          res.json({ 
            order: order,
            history: history 
          });
        }
      );
    }
  );
});

// Update order status (admin)
app.put('/admin/orders/:id/status', (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;
  
  const validStatuses = ['pending', 'confirmed', 'preparing', 'delivered', 'cancelled'];
  
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  
  db.run(
    'UPDATE subscriptions SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [status, id],
    (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      // Log status change
      db.run(
        'INSERT INTO order_history (order_id, status, notes) VALUES (?, ?, ?)',
        [id, status, notes || `Status changed to ${status}`]
      );
      
      res.json({ success: true, message: 'Status updated' });
    }
  );
});

// Update payment status (admin)
app.put('/admin/orders/:id/payment', (req, res) => {
  const { id } = req.params;
  const { payment_status } = req.body;
  
  if (!['paid', 'unpaid'].includes(payment_status)) {
    return res.status(400).json({ error: 'Invalid payment status' });
  }
  
  db.run(
    'UPDATE subscriptions SET payment_status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [payment_status, id],
    (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      // Log payment status change
      db.run(
        'INSERT INTO order_history (order_id, status, notes) VALUES (?, ?, ?)',
        [id, 'payment_update', `Payment marked as ${payment_status}`]
      );
      
      res.json({ success: true, message: 'Payment status updated' });
    }
  );
});

// Get dashboard stats (admin)
app.get('/admin/stats', (req, res) => {
  const stats = {};
  
  // Total orders
  db.get('SELECT COUNT(*) as total FROM subscriptions', [], (err, row) => {
    stats.totalOrders = row.total;
    
    // Pending orders
    db.get('SELECT COUNT(*) as pending FROM subscriptions WHERE status = "pending"', [], (err, row) => {
      stats.pendingOrders = row.pending;
      
      // Unpaid orders
      db.get('SELECT COUNT(*) as unpaid FROM subscriptions WHERE payment_status = "unpaid"', [], (err, row) => {
        stats.unpaidOrders = row.unpaid;
        
        // Total revenue (paid orders)
        db.all('SELECT plan FROM subscriptions WHERE payment_status = "paid"', [], (err, rows) => {
          const prices = { daily: 18, weekly: 119, monthly: 480 };
          stats.totalRevenue = rows.reduce((sum, order) => sum + (prices[order.plan] || 0), 0);
          
          res.json(stats);
        });
      });
    });
  });
});

// Get all newsletter subscribers (admin)
app.get('/admin/newsletter', (req, res) => {
  db.all('SELECT * FROM newsletter ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ subscribers: rows });
  });
});

// ==================== EMAIL ENDPOINTS ====================
// Note: These would integrate with SendGrid/Mailgun in production

app.post('/email/order-confirmation', (req, res) => {
  const { orderId } = req.body;
  
  // In production, this would:
  // 1. Get order details from database
  // 2. Generate email template
  // 3. Send via SendGrid/Mailgun
  // 4. Log email sent
  
  console.log(`Email: Order confirmation sent for order #${orderId}`);
  res.json({ success: true, message: 'Email sent' });
});

app.post('/email/status-update', (req, res) => {
  const { orderId, status } = req.body;
  
  console.log(`Email: Status update sent for order #${orderId} - ${status}`);
  res.json({ success: true, message: 'Email sent' });
});

// ==================== START SERVER ====================

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('=================================');
  console.log(`🔥 FORGE Backend Server Running`);
  console.log(`📡 Port: ${PORT}`);
  console.log(`🌐 http://localhost:${PORT}`);
  console.log('=================================');
});