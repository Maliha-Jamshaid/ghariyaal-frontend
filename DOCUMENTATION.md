# GHARIYAAL - Complete Project Documentation

## Project Overview

GHARIYAAL is a full-stack e-commerce platform for watches and timepieces, consisting of:
1. **Backend API** (Node.js, Express, MongoDB)
2. **Frontend Store** (React, Redux Toolkit, Tailwind CSS)
3. **Admin Panel** (Integrated in React frontend)

## Architecture

### Backend (ghariyaal-backend)
```
- REST API with Express.js
- MongoDB database with Mongoose ODM
- JWT authentication
- Role-based access control (customer/admin)
- Rate limiting and security middleware
```

### Frontend (ghariyaal-frontend)
```
- React 18 with functional components and hooks
- Redux Toolkit for state management
- React Router v6 for navigation
- Tailwind CSS for styling
- Axios for API calls
```

## API Endpoints Summary

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/me` - Get current user profile (Protected)

### Products
- `GET /api/v1/products` - Get all products (Public)
  - Query params: page, limit, search, category, sort
- `GET /api/v1/products/:id` - Get single product (Public)
- `POST /api/v1/products` - Create product (Admin only)
- `PUT /api/v1/products/:id` - Update product (Admin only)
- `DELETE /api/v1/products/:id` - Delete product (Admin only)

### Cart
- `GET /api/v1/cart` - Get user cart (Protected)
- `POST /api/v1/cart` - Add item to cart (Protected)
- `PUT /api/v1/cart` - Update cart item quantity (Protected)
- `DELETE /api/v1/cart/items/:productId` - Remove item (Protected)
- `DELETE /api/v1/cart` - Clear cart (Protected)

### Orders
- `POST /api/v1/orders` - Create order (Protected)
- `GET /api/v1/orders/me` - Get user's orders (Protected)
- `GET /api/v1/orders/:id` - Get single order (Protected)
- `GET /api/v1/orders` - Get all orders (Admin only)
- `PATCH /api/v1/orders/:id/status` - Update order status (Admin only)

## Data Models

### User
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (customer/admin, default: customer),
  timestamps: true
}
```

### Product
```javascript
{
  name: String (required),
  description: String (required),
  price: Number (required, min: 0),
  category: String (required, enum: ['Men', 'Women']),
  imageUrl: String (required),
  stock: Number (required, min: 0),
  timestamps: true
}
```

### Cart
```javascript
{
  user: ObjectId (ref: User),
  items: [{
    product: ObjectId (ref: Product),
    quantity: Number (min: 1)
  }],
  timestamps: true
}
```

### Order
```javascript
{
  user: ObjectId (ref: User),
  items: [{
    product: ObjectId (ref: Product),
    quantity: Number,
    price: Number
  }],
  totalPrice: Number,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  status: String (Pending/Shipped/Delivered/Cancelled),
  paymentMethod: String (Cash on Delivery),
  timestamps: true
}
```

## Frontend Pages

### Public Pages
1. **Home** (`/`)
   - Hero section
   - Category showcase
   - Feature highlights

2. **Products** (`/products`)
   - Product grid with filters
   - Search functionality
   - Category filter
   - Sort options
   - Pagination

3. **Product Details** (`/products/:id`)
   - Product information
   - Image display
   - Add to cart with quantity
   - Stock availability

4. **Login** (`/login`)
   - Email and password fields
   - Redirect to previous page after login

5. **Signup** (`/signup`)
   - Registration form
   - Password confirmation
   - Validation

### Protected Pages (Customer)
6. **Cart** (`/cart`)
   - Cart items list
   - Update quantities
   - Remove items
   - Order summary
   - Proceed to checkout

7. **Checkout** (`/checkout`)
   - Shipping address form
   - Order summary
   - Place order

8. **Order Success** (`/order-success/:orderId`)
   - Confirmation message
   - Order ID
   - Next steps

9. **My Orders** (`/my-orders`)
   - Order history
   - Order details
   - Order status

### Protected Pages (Admin Only)
10. **Admin Dashboard** (`/admin`)
    - Statistics cards
    - Recent orders
    - Quick action links

11. **Admin Products** (`/admin/products`)
    - Product list table
    - Add/Edit/Delete products
    - Modal form

12. **Admin Orders** (`/admin/orders`)
    - All orders list
    - Update order status
    - Order details modal

13. **Admin Users** (`/admin/users`)
    - Placeholder for future implementation

## Redux Store Structure

```javascript
{
  auth: {
    user: Object | null,
    token: String | null,
    isAuthenticated: Boolean,
    loading: Boolean,
    error: String | null
  },
  products: {
    products: Array,
    currentProduct: Object | null,
    pagination: Object,
    filters: Object,
    loading: Boolean,
    error: String | null
  },
  cart: {
    cart: Object | null,
    total: Number,
    loading: Boolean,
    error: String | null
  },
  orders: {
    orders: Array,
    currentOrder: Object | null,
    loading: Boolean,
    error: String | null
  }
}
```

## Authentication Flow

1. User registers or logs in
2. Backend returns JWT token and user data
3. Token stored in localStorage
4. Token automatically added to all API requests
5. Protected routes check authentication status
6. Admin routes check user role
7. Token validated on backend for protected endpoints

## Component Hierarchy

```
App
├── Navbar
├── Routes
│   ├── Public Routes
│   │   ├── Home
│   │   ├── Products
│   │   ├── ProductDetails
│   │   ├── Login
│   │   └── Signup
│   ├── Protected Routes (ProtectedRoute wrapper)
│   │   ├── Cart
│   │   ├── Checkout
│   │   ├── OrderSuccess
│   │   └── MyOrders
│   └── Admin Routes (ProtectedRoute with adminOnly)
│       ├── AdminDashboard
│       ├── AdminProducts
│       ├── AdminOrders
│       └── AdminUsers
└── Footer
```

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/ghariyaal
JWT_SECRET=your-secret-key
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api/v1
```

## Running the Complete Application

### Step 1: Start Backend
```bash
cd ghariyaal-backend
npm install
npm run dev
```

### Step 2: Start Frontend
```bash
cd ghariyaal-frontend
npm install
npm start
```

### Step 3: Access Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Testing Workflow

### As Customer:
1. Sign up at `/signup`
2. Login at `/login`
3. Browse products at `/products`
4. View product details
5. Add items to cart
6. Proceed to checkout
7. Complete order
8. View orders at `/my-orders`

### As Admin:
1. Create account and manually set role to 'admin' in database
2. Login
3. Access admin dashboard at `/admin`
4. Manage products at `/admin/products`
5. Manage orders at `/admin/orders`
6. Update order statuses

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- Role-based access control
- Request validation
- Rate limiting
- Helmet for security headers
- CORS configuration

## Error Handling

- Global error handler middleware (backend)
- Axios interceptors (frontend)
- User-friendly error messages
- Loading states
- Retry functionality
- Form validation

## Future Enhancements

### High Priority
- [ ] Image upload functionality
- [ ] User profile management
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Email notifications

### Medium Priority
- [ ] Multiple payment gateways
- [ ] Advanced order tracking
- [ ] Product categories management
- [ ] Discount codes/coupons
- [ ] Inventory alerts

### Low Priority
- [ ] Social media integration
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Progressive Web App

## Deployment Considerations

### Backend Deployment
- Use environment variables
- Set up MongoDB Atlas
- Configure CORS for production domain
- Set NODE_ENV=production
- Use PM2 or similar for process management

### Frontend Deployment
- Run `npm run build`
- Deploy build folder to hosting service
- Update REACT_APP_API_URL to production API
- Set up proper redirects for SPA routing

### Recommended Services
- Backend: Heroku, DigitalOcean, AWS EC2
- Frontend: Vercel, Netlify, AWS S3 + CloudFront
- Database: MongoDB Atlas
- File Storage: AWS S3, Cloudinary

## Performance Optimization

- React.memo for expensive components
- Code splitting with React.lazy
- Image optimization
- Pagination for large datasets
- Database indexing
- API response caching
- Minimize bundle size

## Troubleshooting

### Common Issues

**CORS Error:**
- Ensure backend CORS is configured for frontend URL
- Check if API URL in frontend .env is correct

**401 Unauthorized:**
- Check if token is valid
- Verify token is being sent in Authorization header
- Ensure user is logged in

**Connection Refused:**
- Verify backend server is running
- Check port numbers match
- Ensure MongoDB is running

**Images Not Loading:**
- Use valid image URLs
- Check image URL format in product data
- Verify CORS allows image loading

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## License

MIT License - Feel free to use for learning and commercial projects.

## Contact

For questions or support:
- Email: info@ghariyaal.com
- GitHub: [Create Issue]

---

**Built with ❤️ for E-commerce and Design Management Course**
