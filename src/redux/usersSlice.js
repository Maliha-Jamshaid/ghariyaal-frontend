import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

// Fetch all users (admin only)
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (params = {}, { rejectWithValue }) => {
    try {
      const { page = 1, limit = 50, search = '', role = '' } = params;
      const response = await api.get('/users', {
        params: { page, limit, search, role },
      });
      return response; // Interceptor already extracts response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
    }
  }
);

// Create admin user
export const createAdmin = createAsyncThunk(
  'users/createAdmin',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/users/create-admin', userData);
      return response; // Interceptor already extracts response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create admin');
    }
  }
);

// Update user role
export const updateUserRole = createAsyncThunk(
  'users/updateUserRole',
  async ({ userId, role }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/users/${userId}/role`, { role });
      return response; // Interceptor already extracts response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update user role');
    }
  }
);

// Delete user
export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/users/${userId}`);
      return { userId, ...response }; // Interceptor already extracts response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete user');
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    pagination: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        console.log('Users API Response:', action.payload);
        // Interceptor returns full response: { success, message, data: { users, pagination } }
        state.users = action.payload.data?.users || [];
        state.pagination = action.payload.data?.pagination || null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        console.error('Users API Error:', action.payload);
        state.error = action.payload;
      })
      // Create admin
      .addCase(createAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAdmin.fulfilled, (state, action) => {
        state.loading = false;
        const newUser = action.payload.data?.user;
        if (newUser) {
          state.users.unshift(newUser);
        }
      })
      .addCase(createAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update user role
      .addCase(updateUserRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload.data?.user;
        if (updatedUser) {
          const index = state.users.findIndex(u => u._id === updatedUser._id);
          if (index !== -1) {
            state.users[index] = updatedUser;
          }
        }
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete user
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(u => u._id !== action.payload.userId);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = usersSlice.actions;
export default usersSlice.reducer;
