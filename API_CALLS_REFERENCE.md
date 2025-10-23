# API Calls Reference Guide

## 📍 Where Are the API Calls?

Your frontend application has a **clean, organized structure** for all API calls:

```
src/
├── services/
│   ├── api.js              👈 Axios instance configuration
│   └── apiService.js       👈 All API endpoint functions
└── redux/
    ├── authSlice.js        👈 Auth API calls (register, login, getMe)
    ├── productsSlice.js    👈 Products API calls (CRUD)
    ├── cartSlice.js        👈 Cart API calls (add, update, remove)
    └── ordersSlice.js      👈 Orders API calls (create, fetch, update)
```

---

## 🔧 API Configuration

### 📁 `src/services/api.js`

**Purpose**: Creates and configures the Axios instance

**Key Features**:
- Base URL: `http://localhost:5000/api/v1`
- Automatic JWT token injection in headers
- Centralized error handling
- Response data extraction

```javascript
const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  headers: { 'Content-Type': 'application/json' }
});

// Auto-adds token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

## 📡 API Service Functions

### 📁 `src/services/apiService.js`

All API endpoints are organized by feature:

### 🔐 **Auth API**
```javascript
authAPI.register(userData)        // POST /auth/register
authAPI.login(credentials)        // POST /auth/login
authAPI.getMe()                   // GET /auth/me
```

**Example Usage**:
```javascript
import { authAPI } from '../services/apiService';

// Register
const response = await authAPI.register({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123'
});

// Login
const response = await authAPI.login({
  email: 'john@example.com',
  password: 'password123'
});
```

---

### 🛍️ **Products API**
```javascript
productsAPI.getAll(params)        // GET /products?search=...&category=...
productsAPI.getById(id)           // GET /products/:id
productsAPI.create(productData)   // POST /products (Admin)
productsAPI.update(id, data)      // PUT /products/:id (Admin)
productsAPI.delete(id)            // DELETE /products/:id (Admin)
```

**Example Usage**:
```javascript
import { productsAPI } from '../services/apiService';

// Get all products with filters
const response = await productsAPI.getAll({
  search: 'watch',
  category: 'Men',
  sort: 'price',
  page: 1,
  limit: 12
});

// Get single product
const product = await productsAPI.getById('product-id-123');

// Create product (Admin)
const newProduct = await productsAPI.create({
  name: 'Luxury Watch',
  description: 'Premium timepiece',
  price: 299.99,
  category: 'Men',
  imageUrl: 'https://example.com/image.jpg',
  stock: 50
});
```

---

### 🛒 **Cart API**
```javascript
cartAPI.get()                     // GET /cart
cartAPI.addItem(productId, qty)   // POST /cart
cartAPI.updateItem(productId, qty)// PUT /cart
cartAPI.removeItem(productId)     // DELETE /cart/items/:productId
cartAPI.clear()                   // DELETE /cart
```

**Example Usage**:
```javascript
import { cartAPI } from '../services/apiService';

// Get cart
const cart = await cartAPI.get();

// Add item to cart
await cartAPI.addItem('product-id-123', 2);

// Update quantity
await cartAPI.updateItem('product-id-123', 5);

// Remove item
await cartAPI.removeItem('product-id-123');

// Clear entire cart
await cartAPI.clear();
```

---

### 📦 **Orders API**
```javascript
ordersAPI.create(orderData)       // POST /orders
ordersAPI.getMyOrders()           // GET /orders/me
ordersAPI.getAll()                // GET /orders (Admin)
ordersAPI.getById(id)             // GET /orders/:id
ordersAPI.updateStatus(id, status)// PATCH /orders/:id/status (Admin)
```

**Example Usage**:
```javascript
import { ordersAPI } from '../services/apiService';

// Create order
const order = await ordersAPI.create({
  items: [
    { product: 'product-id', quantity: 2, price: 99.99 }
  ],
  totalPrice: 199.98,
  shippingAddress: {
    street: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'USA'
  },
  paymentMethod: 'Cash on Delivery'
});

// Get my orders
const myOrders = await ordersAPI.getMyOrders();

// Admin: Update order status
await ordersAPI.updateStatus('order-id-123', 'Shipped');
```

---

## 🔄 Redux Thunks (Async API Calls)

API calls are wrapped in Redux Toolkit's `createAsyncThunk` for state management:

### 📁 `src/redux/authSlice.js`
```javascript
import { createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '../services/apiService';

// Register user
export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authAPI.register(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Login user
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Get current user
export const getMe = createAsyncThunk(
  'auth/getMe',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.getMe();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
```

### 📁 `src/redux/productsSlice.js`
```javascript
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params) => {
    const response = await productsAPI.getAll(params);
    return response.data;
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id) => {
    const response = await productsAPI.getById(id);
    return response.data;
  }
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData) => {
    const response = await productsAPI.create(productData);
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, productData }) => {
    const response = await productsAPI.update(id, productData);
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id) => {
    await productsAPI.delete(id);
    return id;
  }
);
```

### 📁 `src/redux/cartSlice.js`
```javascript
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async () => {
    const response = await cartAPI.get();
    return response.data;
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity }) => {
    const response = await cartAPI.addItem(productId, quantity);
    return response.data;
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ productId, quantity }) => {
    const response = await cartAPI.updateItem(productId, quantity);
    return response.data;
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (productId) => {
    const response = await cartAPI.removeItem(productId);
    return response.data;
  }
);

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async () => {
    const response = await cartAPI.clear();
    return response.data;
  }
);
```

### 📁 `src/redux/ordersSlice.js`
```javascript
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData) => {
    const response = await ordersAPI.create(orderData);
    return response.data;
  }
);

export const fetchMyOrders = createAsyncThunk(
  'orders/fetchMyOrders',
  async () => {
    const response = await ordersAPI.getMyOrders();
    return response.data;
  }
);

export const fetchAllOrders = createAsyncThunk(
  'orders/fetchAllOrders',
  async () => {
    const response = await ordersAPI.getAll();
    return response.data;
  }
);

export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ id, status }) => {
    const response = await ordersAPI.updateStatus(id, status);
    return response.data;
  }
);
```

---

## 💡 How to Use API Calls in Components

### Example 1: Login Component
```javascript
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Dispatch Redux thunk
    const result = await dispatch(login({ email, password }));
    
    if (result.type === 'auth/login/fulfilled') {
      // Success - redirect or show message
      console.log('Login successful');
    } else {
      // Error - show error message
      console.error('Login failed:', result.payload);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}
```

### Example 2: Products Page
```javascript
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productsSlice';

function Products() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    // Fetch products on component mount
    dispatch(fetchProducts({ 
      search: '', 
      category: '', 
      page: 1 
    }));
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {products.map((product) => (
        <div key={product._id}>{product.name}</div>
      ))}
    </div>
  );
}
```

### Example 3: Add to Cart
```javascript
import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = async () => {
    const result = await dispatch(addToCart({ 
      productId: product._id, 
      quantity: 1 
    }));
    
    if (result.type === 'cart/addToCart/fulfilled') {
      alert('Added to cart!');
    }
  };

  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}
```

---

## 🔑 Authentication Flow

1. **User logs in** → `authAPI.login()` → Returns `{ token, user }`
2. **Token saved to localStorage** → `localStorage.setItem('token', token)`
3. **Axios interceptor** → Automatically adds token to all requests
4. **Protected routes** → Check `isAuthenticated` in Redux state

---

## 📊 Complete API Endpoints List

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/login` | Login user | No |
| GET | `/auth/me` | Get current user | Yes |

### Products
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/products` | Get all products | No |
| GET | `/products/:id` | Get single product | No |
| POST | `/products` | Create product | Admin |
| PUT | `/products/:id` | Update product | Admin |
| DELETE | `/products/:id` | Delete product | Admin |

### Cart
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/cart` | Get user cart | Yes |
| POST | `/cart` | Add item to cart | Yes |
| PUT | `/cart` | Update cart item | Yes |
| DELETE | `/cart/items/:productId` | Remove item | Yes |
| DELETE | `/cart` | Clear cart | Yes |

### Orders
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/orders` | Create order | Yes |
| GET | `/orders/me` | Get user orders | Yes |
| GET | `/orders` | Get all orders | Admin |
| GET | `/orders/:id` | Get single order | Yes |
| PATCH | `/orders/:id/status` | Update status | Admin |

---

## 🛠️ Quick Reference

### Change API Base URL
Edit `.env` file:
```
REACT_APP_API_URL=http://localhost:5000/api/v1
```

### Add New API Endpoint
1. Add function to `src/services/apiService.js`
2. Create thunk in appropriate Redux slice
3. Use in component with `useDispatch()`

### Handle Loading States
```javascript
const { loading } = useSelector((state) => state.products);
if (loading) return <Loading />;
```

### Handle Errors
```javascript
const { error } = useSelector((state) => state.products);
if (error) return <ErrorMessage message={error} />;
```

---

## 📝 Summary

**All API calls are in TWO main files:**
1. **`src/services/apiService.js`** - Raw API functions
2. **Redux slices** (`src/redux/*.js`) - Async thunks that use those functions

**Components never call APIs directly** - they dispatch Redux thunks instead!

This architecture provides:
✅ Centralized API logic
✅ Automatic token management
✅ Consistent error handling
✅ Loading state management
✅ Easy to test and maintain
