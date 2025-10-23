import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { cartAPI } from '../services/apiService';

// Async thunks
export const fetchCart = createAsyncThunk(
  'cart/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartAPI.get();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addItem',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await cartAPI.addItem(productId, quantity);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/updateItem',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await cartAPI.updateItem(productId, quantity);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeItem',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await cartAPI.removeItem(productId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const clearCart = createAsyncThunk(
  'cart/clear',
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartAPI.clear();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Initial state
const initialState = {
  cart: null,
  total: 0,
  loading: false,
  error: null,
};

// Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.cart;
        state.total = action.payload.total;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add to cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.cart;
        state.total = action.payload.total;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update cart item
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.cart;
        state.total = action.payload.total;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Remove from cart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.cart;
        state.total = action.payload.total;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Clear cart
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.loading = false;
        state.cart = null;
        state.total = 0;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = cartSlice.actions;
export default cartSlice.reducer;
