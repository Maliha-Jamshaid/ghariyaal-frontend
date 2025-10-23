import api from './api';

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
};

// Products API
export const productsAPI = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  create: (productData) => api.post('/products', productData),
  update: (id, productData) => api.put(`/products/${id}`, productData),
  delete: (id) => api.delete(`/products/${id}`),
};

// Cart API
export const cartAPI = {
  get: () => api.get('/cart'),
  addItem: (productId, quantity) => api.post('/cart', { productId, quantity }),
  updateItem: (productId, quantity) => api.put('/cart', { productId, quantity }),
  removeItem: (productId) => api.delete(`/cart/items/${productId}`),
  clear: () => api.delete('/cart'),
};

// Orders API
export const ordersAPI = {
  create: (orderData) => api.post('/orders', orderData),
  getMyOrders: () => api.get('/orders/me'),
  getAll: () => api.get('/orders'),
  getById: (id) => api.get(`/orders/${id}`),
  updateStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }),
};
