# Ghariyaal Frontend - Premium Watch E-Commerce

A modern, responsive e-commerce frontend for premium watches built with React 19, Redux Toolkit, and Tailwind CSS.

## 🌐 Live Demo
[www.ghariyaal.studio](https://www.ghariyaal.studio)

## ✨ Features

### Customer Features
- 🏠 **Landing Page**: Beautiful hero section with featured products and categories
- 🛍️ **Products Listing**: Advanced filtering (search, category, price sorting) with pagination
- 🔍 **Product Details**: Comprehensive product information with image gallery
- 🛒 **Shopping Cart**: Real-time cart management with quantity updates
- 💳 **Checkout**: Secure checkout process with address auto-fill
- 📦 **Order Tracking**: View order history and real-time status updates
- 👤 **User Profile**: Profile management with edit capabilities and password change
- 🔐 **Authentication**: Secure JWT-based login/signup with rate limiting
- 📱 **Fully Responsive**: Mobile-first design optimized for all devices
- ❓ **Help Pages**: About, Contact, and FAQ pages

### Admin Panel Features
- 📊 **Dashboard**: Overview with key metrics and statistics
- 📝 **Product Management**: Full CRUD operations for products
- 📦 **Order Management**: View all orders and update statuses
- 👥 **User Management**: Manage users and create admin accounts
- 🔒 **Role-Based Access**: Protected admin routes

### SEO & Performance
- 🎯 **SEO Optimized**: Meta tags, Open Graph, Twitter Cards
- 🗺️ **Sitemap**: Auto-generated sitemap.xml
- 🤖 **Robots.txt**: Proper crawling configuration
- 📱 **PWA Support**: Progressive Web App with manifest
- ⚡ **Fast Loading**: Optimized bundle size and lazy loading

## 🚀 Tech Stack

### Core
- **React** 19.2.0 - Modern React with hooks
- **Redux Toolkit** 2.9.0 - Efficient state management
- **React Router** 7.9.4 - Client-side routing
- **Tailwind CSS** 3.4.18 - Utility-first styling

### Libraries
- **Axios** 1.12.2 - HTTP client with interceptors
- **Heroicons** 2.2.0 - Beautiful SVG icons
- **React Helmet Async** - SEO meta tag management
- **JWT Decode** - Token handling

## 📁 Project Structure

```
ghariyaal-frontend/
├── public/
│   ├── logo.png              # Brand logo
│   ├── robots.txt            # Search engine instructions
│   ├── sitemap.xml           # SEO sitemap
│   ├── manifest.json         # PWA manifest
│   └── index.html            # HTML template with SEO meta tags
│
├── src/
│   ├── components/           # Reusable components
│   │   ├── Navbar.js        # Navigation with cart count
│   │   ├── Footer.js        # Footer with links
│   │   ├── SEO.js           # SEO component wrapper
│   │   ├── Loading.js       # Loading spinner
│   │   ├── ErrorMessage.js  # Error display
│   │   └── ProtectedRoute.js # Route protection
│   │
│   ├── pages/               # Page components
│   │   ├── Home.js          # Landing page
│   │   ├── Products.js      # Product listing
│   │   ├── ProductDetails.js # Single product view
│   │   ├── Cart.js          # Shopping cart
│   │   ├── Checkout.js      # Checkout form
│   │   ├── OrderSuccess.js  # Order confirmation
│   │   ├── MyOrders.js      # User orders
│   │   ├── Profile.js       # User profile management
│   │   ├── About.js         # About page
│   │   ├── ContactUs.js     # Contact form
│   │   ├── FAQ.js           # Frequently asked questions
│   │   ├── Login.js         # User login
│   │   ├── Signup.js        # User registration
│   │   └── admin/           # Admin pages
│   │       ├── AdminDashboard.js
│   │       ├── AdminProducts.js
│   │       ├── AdminOrders.js
│   │       └── AdminUsers.js
│   │
│   ├── redux/               # Redux state management
│   │   ├── store.js         # Redux store configuration
│   │   ├── authSlice.js     # Authentication state
│   │   ├── productsSlice.js # Products state
│   │   ├── cartSlice.js     # Cart state
│   │   ├── ordersSlice.js   # Orders state
│   │   └── usersSlice.js    # Users state (admin)
│   │
│   ├── services/            # API services
│   │   ├── api.js           # Axios instance with interceptors
│   │   └── apiService.js    # API endpoints
│   │
│   ├── App.js               # Main app with routes
│   ├── index.js             # App entry point
│   └── index.css            # Global styles with Tailwind
│
├── .env                      # Environment variables (not committed)
├── .gitignore               # Git ignore rules
├── package.json             # Dependencies
├── tailwind.config.js       # Tailwind configuration
└── README.md                # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 14+ and npm
- Backend API running (see ghariyaal-backend)

### Step 1: Install Dependencies

```bash
npm install --legacy-peer-deps
```

> Note: `--legacy-peer-deps` is required for React 19 compatibility with react-helmet-async

### Step 2: Configure Environment

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:5000/api/v1
```

For production:
```env
REACT_APP_API_URL=https://your-backend-url.com/api/v1
```

### Step 3: Start Development Server

```bash
npm start
```

The app will open at `http://localhost:3000`

### Step 4: Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 🔌 API Integration

### Authentication Endpoints
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user
- `PUT /auth/update-profile` - Update user profile
- `PUT /auth/change-password` - Change password

### Product Endpoints
- `GET /products` - List all products (with filters)
- `GET /products/:id` - Get single product
- `POST /products` - Create product (Admin)
- `PUT /products/:id` - Update product (Admin)
- `DELETE /products/:id` - Delete product (Admin)

### Cart Endpoints
- `GET /cart` - Get user cart
- `POST /cart` - Add item to cart
- `PUT /cart` - Update cart item quantity
- `DELETE /cart/items/:productId` - Remove item from cart
- `DELETE /cart` - Clear entire cart

### Order Endpoints
- `GET /orders/me` - Get user's orders
- `POST /orders` - Create new order
- `GET /orders` - Get all orders (Admin)
- `PATCH /orders/:id/status` - Update order status (Admin)

### User Endpoints (Admin)
- `GET /users` - Get all users with pagination
- `POST /users/create-admin` - Create admin user
- `PUT /users/:id/role` - Update user role
- `DELETE /users/:id` - Delete user

## 🎨 Customization

### Change Primary Color

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: {
    50: '#eff6ff',
    // ... your custom colors
    600: '#8B5CF6', // Main brand color
    700: '#7C3AED',
  }
}
```

### Update Brand Logo

Replace `public/logo.png` with your logo (recommended: 512x512px PNG with transparency)

### Modify SEO Settings

Update meta tags in:
- `public/index.html` - Base meta tags
- `src/components/SEO.js` - Dynamic page meta tags
- `public/sitemap.xml` - Update URLs
- `public/manifest.json` - PWA settings

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

All pages are optimized for mobile-first design.

## 🔐 Authentication Flow

1. User registers/logs in
2. JWT token stored in localStorage
3. Token sent in Authorization header for protected routes
4. Auto-redirect to login on 401 errors
5. Token refresh on app reload

## 🛒 Cart Management

- Cart persists in backend (MongoDB)
- Real-time quantity updates
- Stock validation
- Auto-sync on login
- Clear cart after order placement

## 📦 State Management

Using Redux Toolkit with slices:
- **authSlice**: User authentication, profile
- **productsSlice**: Product listing, filtering, details
- **cartSlice**: Shopping cart operations
- **ordersSlice**: Order creation, tracking
- **usersSlice**: User management (admin)

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import repository to Vercel
3. Set environment variable: `REACT_APP_API_URL`
4. Deploy!

### Netlify

1. Build the app: `npm run build`
2. Drag & drop `build` folder to Netlify
3. Configure environment variables
4. Update `_redirects` file for React Router

### Manual Deployment

```bash
npm run build
# Upload 'build' folder to your hosting
```

## 🧪 Testing Accounts

### Customer Account
- Email: customer@example.com
- Password: password123

### Admin Account
- Email: admin@ghariyaal.com  
- Password: admin123

## 🎯 Key Features Explained

### Product Filtering
- Search by name/description
- Filter by category (Men/Women)
- Sort by price (Low to High, High to Low)
- Pagination with customizable page size

### Profile Management
- Edit personal info (name, email, phone)
- Manage shipping address
- Change password securely
- View account statistics

### Checkout Process
- Auto-fill from profile address
- Validate all required fields
- Real-time total calculation
- Order confirmation page

### Admin Dashboard
- Total revenue, orders, products, users
- Recent orders with status
- Low stock alerts
- Quick action buttons

## 🐛 Troubleshooting

### Issue: "Module not found: Can't resolve 'react-helmet-async'"
**Solution**: Install with legacy peer deps:
```bash
npm install react-helmet-async --legacy-peer-deps
```

### Issue: API calls failing with CORS error
**Solution**: Ensure backend has CORS enabled and correct origin

### Issue: Cart not updating
**Solution**: Check if user is authenticated and backend is running

### Issue: Images not loading
**Solution**: Verify image URLs are correct and accessible

## 📚 Learn More

- [React Documentation](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 👨‍💻 Author

**Ghariyaal Team**
- Website: [www.ghariyaal.studio](https://www.ghariyaal.studio)
- GitHub: [Maliha-Jamshaid](https://github.com/Maliha-Jamshaid)

## 🙏 Acknowledgments

- Icons by [Heroicons](https://heroicons.com/)
- UI inspiration from modern e-commerce platforms
- Product images from premium watch brands

---

Built with ❤️ for watch enthusiasts in Pakistan

## 🚀 Features

### Store Frontend
- ✅ **Landing Page**: Attractive hero section with category showcase
- ✅ **Products Listing**: Advanced filters (search, category, sorting) with pagination
- ✅ **Product Details**: Full product information with quantity selector
- ✅ **Shopping Cart**: Real-time cart management
- ✅ **Checkout**: Secure checkout with address form
- ✅ **Order Management**: View order history and status
- ✅ **Authentication**: Login and signup with JWT
- ✅ **Fully Responsive**: Mobile-first design

### Admin Panel
- ✅ **Dashboard**: Key metrics and recent orders overview
- ✅ **Products Management**: CRUD operations for products
- ✅ **Orders Management**: View and update order statuses
- ✅ **Users Management**: Placeholder for future implementation
- ✅ **Protected Routes**: Admin-only access

## 📦 Tech Stack

- **React 18** - Modern React with hooks
- **Redux Toolkit** - State management
- **React Router v6** - Client-side routing
- **Axios** - HTTP client with interceptors
- **Tailwind CSS** - Utility-first CSS framework
- **Heroicons** - Beautiful SVG icons

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 14+ and npm
- Backend API running on http://localhost:5000

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment**
   
   The `.env` file is already configured:
   ```
   REACT_APP_API_URL=http://localhost:5000/api/v1
   ```

3. **Start Development Server**
   ```bash
   npm start
   ```
   
   The app will open at `http://localhost:3000`

4. **Build for Production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.js
│   ├── Footer.js
│   ├── Loading.js
│   ├── ErrorMessage.js
│   └── ProtectedRoute.js
├── pages/              # Page components
│   ├── Home.js
│   ├── Products.js
│   ├── ProductDetails.js
│   ├── Cart.js
│   ├── Checkout.js
│   ├── OrderSuccess.js
│   ├── MyOrders.js
│   ├── Login.js
│   ├── Signup.js
│   └── admin/          # Admin pages
├── redux/              # Redux store and slices
│   ├── store.js
│   ├── authSlice.js
│   ├── productsSlice.js
│   ├── cartSlice.js
│   └── ordersSlice.js
├── services/           # API services
│   ├── api.js
│   └── apiService.js
└── App.js              # Main app with routing
```

## 🔌 API Integration

All backend APIs are fully integrated:

- **Auth**: Register, Login, Get Profile
- **Products**: List, Details, Create, Update, Delete (Admin)
- **Cart**: Get, Add, Update, Remove, Clear
- **Orders**: Create, Get My Orders, Get All (Admin), Update Status (Admin)

## 🎨 Customization

### Colors
Modify `tailwind.config.js`:
```javascript
colors: {
  primary: {
    600: '#0284c7', // Your custom color
  }
}
```

### API URL
Update `.env` file:
```
REACT_APP_API_URL=your-api-url
```

## 👤 Testing

### Customer Account
1. Sign up at `/signup`
2. Login at `/login`
3. Browse products, add to cart, checkout

### Admin Account
1. Create user via signup
2. Manually change role to 'admin' in MongoDB
3. Access admin panel at `/admin`

## 📱 Responsive Design

- Mobile-first approach
- Hamburger menu on mobile
- Responsive grid layouts
- Touch-friendly interface

## ⚡ Key Features

- JWT authentication with automatic token management
- Protected routes (user & admin)
- Real-time cart updates
- Loading and error states
- Form validation
- Pagination
- Search and filters
- Order status tracking

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
