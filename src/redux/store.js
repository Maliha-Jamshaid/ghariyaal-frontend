import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import productsReducer from './productsSlice';
import cartReducer from './cartSlice';
import ordersReducer from './ordersSlice';
import usersReducer from './usersSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
    users: usersReducer,
  },
});

export default store;
