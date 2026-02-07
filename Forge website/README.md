# FORGE - Healthy Meal Prep Website

A complete, professional meal prep subscription website with black-dominated design.

## 📁 File Structure

```
forge/
├── index.html              # Homepage
├── about.html             # About Us page
├── products.html          # Menu/Products page
├── social-proof.html      # Testimonials & approvals
├── newsletter.html        # Newsletter subscription
├── subscription.html      # Payment & subscription form
├── login.html            # User login
├── register.html         # User registration
├── terms.html            # Terms & Conditions
├── privacy.html          # Privacy Policy
├── style.css             # All styles
├── script.js             # Main JavaScript
├── subscription.js       # Subscription page JS
├── server.js             # Backend server
└── forge-logo.jpeg       # Logo image
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install express sqlite3 cors
```

### 2. Start the Backend
```bash
node server.js
```

### 3. Open the Website
Open `index.html` in your browser or use a local server:
```bash
npx live-server
```

## ✨ Features

### Navigation
- ✅ Responsive navigation bar
- ✅ User login/register dropdown
- ✅ Mobile-friendly hamburger menu
- ✅ Active page highlighting

### Pages
1. **Home** - Hero section, features, pricing plans
2. **About Us** - Mission, values, what makes FORGE different
3. **Products** - Complete menu with macros for each meal
4. **Social Proof** - Nutritionist approvals, gym partnerships, athlete testimonials
5. **Newsletter** - Email subscription with interest selection
6. **Subscription** - Full payment form with card/cash options
7. **Login/Register** - User authentication pages
8. **Terms & Privacy** - Legal pages

### Subscription Features
- ✅ Clickable plan selection (Daily, Weekly, Monthly)
- ✅ Personal information form
- ✅ Payment method choice (Card or Cash)
- ✅ Card payment fields with formatting
- ✅ Cash payment instructions
- ✅ Form validation

### Design
- ✅ Black-dominated color scheme
- ✅ Professional, clean layout
- ✅ Fully responsive (desktop, tablet, mobile)
- ✅ Smooth transitions and hover effects
- ✅ Logo integration throughout

## 🔐 Security Recommendations

### For Production Deployment:

#### 1. HTTPS/SSL Certificate
```
- Purchase SSL certificate from: Let's Encrypt (free), Cloudflare, or your hosting provider
- Enforce HTTPS redirects
- Update all URLs to use https://
```

#### 2. Secure Backend
```javascript
// Add to server.js:

// Environment variables
require('dotenv').config();

// Security headers
const helmet = require('helmet');
app.use(helmet());

// Rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Password hashing
const bcrypt = require('bcrypt');

// JWT for authentication
const jwt = require('jsonwebtoken');
```

#### 3. Payment Security
```
IMPORTANT: Never process real credit cards directly!

Options:
1. Stripe Integration (Recommended)
   - Sign up at stripe.com
   - Use Stripe.js for secure card handling
   - Stripe handles PCI compliance

2. PayPal
   - Integrate PayPal buttons
   - Redirect to PayPal for payment

3. Square
   - Use Square payment form
   - No card data touches your server
```

#### 4. Database Security
```javascript
// Use parameterized queries (already done in server.js)
// Add encryption for sensitive data
// Regular backups
// Move database outside web root
```

#### 5. Environment Variables
Create `.env` file:
```
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key_here
STRIPE_SECRET_KEY=your_stripe_key
SESSION_SECRET=your_session_secret
```

#### 6. Input Validation
```javascript
// Install validator
npm install validator

// Add to server.js
const validator = require('validator');

// Validate email
if (!validator.isEmail(email)) {
  return res.status(400).json({ error: 'Invalid email' });
}
```

## 🌐 SEO Features (Already Implemented)

✅ Meta descriptions on all pages
✅ Semantic HTML structure
✅ Optimized headings (H1, H2, H3)
✅ Alt text for images
✅ Open Graph tags for social sharing
✅ Mobile-responsive design
✅ Fast loading times
✅ Clean URL structure

### Additional SEO Recommendations:

1. **Create sitemap.xml**
2. **Create robots.txt**
3. **Set up Google Analytics**
4. **Add Schema.org markup**
5. **Optimize images** (compress, WebP format)
6. **Add canonical URLs**

## 📊 Hosting Recommendations

### Shared Hosting (Basic)
- Bluehost ($3-10/month)
- HostGator ($3-10/month)
- SiteGround ($7-15/month)

### VPS Hosting (Better Performance)
- DigitalOcean ($5-20/month)
- Linode ($5-20/month)
- Vultr ($5-20/month)

### Platform as a Service (Easiest)
- Heroku (Free tier available)
- Vercel (Free for frontend)
- Netlify (Free for frontend)
- Railway.app ($5/month)

### Full Stack Hosting
1. **Frontend**: Netlify or Vercel (free)
2. **Backend**: Railway, Render, or Heroku ($5-10/month)
3. **Database**: MongoDB Atlas (free tier) or PostgreSQL on hosting

## 🔧 Environment Setup

### Development
```bash
# Local development
npx live-server

# Backend development
nodemon server.js
```

### Production
```bash
# Use PM2 for process management
npm install -g pm2
pm2 start server.js
pm2 startup
pm2 save
```

## 📝 Database Schema

```sql
CREATE TABLE subscriptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  plan TEXT,
  payment_method TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT UNIQUE,
  password_hash TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE newsletter (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT UNIQUE,
  interests TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🎨 Customization

### Colors
Edit CSS variables in `style.css`:
```css
:root {
    --primary-black: #000000;
    --primary-white: #ffffff;
    --dark-gray: #1a1a1a;
    --medium-gray: #666666;
    --light-gray: #e5e5e5;
    --border-gray: #333333;
}
```

### Logo
Replace `forge-logo.jpeg` with your logo (recommended: 300x100px transparent PNG)

### Content
Edit HTML files to update text, images, and information

## 📞 Support

For questions or issues:
- Email: support@forge.com
- Documentation: [Your docs URL]

## 📄 License

© 2026 FORGE. All rights reserved.

---

## ⚠️ Important Notes Before Going Live

1. **Remove Demo Data** - Update placeholder text with real information
2. **Test All Forms** - Verify email, payment, newsletter subscriptions work
3. **SSL Certificate** - Must have HTTPS before accepting any payments
4. **Payment Gateway** - Set up Stripe/PayPal (don't store real card numbers!)
5. **Privacy Compliance** - Update privacy policy with actual practices
6. **Backup System** - Set up automated database backups
7. **Analytics** - Install Google Analytics or similar
8. **Email Service** - Set up transactional emails (SendGrid, Mailgun, etc.)
9. **Domain Name** - Purchase and configure your domain
10. **Security Audit** - Run security checks before launch

## 🚀 Deployment Checklist

- [ ] Purchase domain name
- [ ] Set up hosting
- [ ] Install SSL certificate
- [ ] Configure DNS settings
- [ ] Set up email service
- [ ] Integrate payment gateway (Stripe recommended)
- [ ] Test all forms and links
- [ ] Add Google Analytics
- [ ] Submit sitemap to Google
- [ ] Test on multiple devices
- [ ] Set up backups
- [ ] Launch! 🎉