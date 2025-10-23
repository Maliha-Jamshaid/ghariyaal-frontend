import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productsAPI } from '../services/apiService';

// Async thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (params, { rejectWithValue }) => {
    try {
      const response = await productsAPI.getAll(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await productsAPI.getById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createProduct = createAsyncThunk(
  'products/create',
  async (productData, { rejectWithValue }) => {
    try {
      const response = await productsAPI.create(productData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/update',
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const response = await productsAPI.update(id, productData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id, { rejectWithValue }) => {
    try {
      await productsAPI.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Initial state
const initialState = {
  products: [],
  currentProduct: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
  filters: {
    search: '',
    category: '',
    sort: '-createdAt',
  },
  loading: false,
  error: null,
};

// Slice
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        search: '',
        category: '',
        sort: '-createdAt',
      };
    },
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data || action.payload;
        if (action.payload.pagination) {
          state.pagination = action.payload.pagination;
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload.data || action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        const product = action.payload.data || action.payload;
        state.products.unshift(product);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const product = action.payload.data || action.payload;
        const index = state.products.findIndex(p => p._id === product._id);
        if (index !== -1) {
          state.products[index] = product;
        }
        if (state.currentProduct?._id === product._id) {
          state.currentProduct = product;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(p => p._id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, clearFilters, clearError, clearCurrentProduct } = productsSlice.actions;
export default productsSlice.reducer;
