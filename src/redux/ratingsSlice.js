import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

// Create or update rating
export const createRating = createAsyncThunk(
  'ratings/create',
  async (ratingData, { rejectWithValue }) => {
    try {
      const response = await api.post('/ratings', ratingData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to submit rating'
      );
    }
  }
);

// Get product ratings
export const getProductRatings = createAsyncThunk(
  'ratings/getProductRatings',
  async ({ productId, page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/ratings/product/${productId}?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch ratings'
      );
    }
  }
);

// Get order item rating
export const getOrderItemRating = createAsyncThunk(
  'ratings/getOrderItemRating',
  async ({ orderId, orderItemId }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/ratings/order/${orderId}/item/${orderItemId}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch rating'
      );
    }
  }
);

// Delete rating
export const deleteRating = createAsyncThunk(
  'ratings/delete',
  async (ratingId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/ratings/${ratingId}`);
      return ratingId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete rating'
      );
    }
  }
);

const ratingsSlice = createSlice({
  name: 'ratings',
  initialState: {
    productRatings: {
      ratings: [],
      currentPage: 1,
      totalPages: 1,
      totalRatings: 0,
    },
    loading: false,
    error: null,
    submitSuccess: false,
  },
  reducers: {
    clearRatingError: (state) => {
      state.error = null;
    },
    clearSubmitSuccess: (state) => {
      state.submitSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create rating
      .addCase(createRating.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.submitSuccess = false;
      })
      .addCase(createRating.fulfilled, (state, action) => {
        state.loading = false;
        state.submitSuccess = true;
      })
      .addCase(createRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.submitSuccess = false;
      })
      // Get product ratings
      .addCase(getProductRatings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductRatings.fulfilled, (state, action) => {
        state.loading = false;
        state.productRatings = action.payload;
      })
      .addCase(getProductRatings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete rating
      .addCase(deleteRating.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRating.fulfilled, (state, action) => {
        state.loading = false;
        state.productRatings.ratings = state.productRatings.ratings.filter(
          (rating) => rating._id !== action.payload
        );
      })
      .addCase(deleteRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearRatingError, clearSubmitSuccess } = ratingsSlice.actions;
export default ratingsSlice.reducer;
