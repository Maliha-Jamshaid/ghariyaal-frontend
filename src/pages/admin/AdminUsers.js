import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, createAdmin, updateUserRole, deleteUser } from '../../redux/usersSlice';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import { 
  UsersIcon, 
  PlusIcon, 
  MagnifyingGlassIcon,
  XMarkIcon,
  ShieldCheckIcon,
  UserIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

const AdminUsers = () => {
  const dispatch = useDispatch();
  const { users, pagination, loading, error } = useSelector((state) => state.users);
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    dispatch(fetchUsers({ search: searchTerm, role: roleFilter }));
  }, [dispatch, searchTerm, roleFilter]);

  // Debug logging
  useEffect(() => {
    console.log('Users state:', { users, pagination, loading, error });
  }, [users, pagination, loading, error]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchUsers({ search: searchTerm, role: roleFilter }));
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setFormErrors({});

    // Validation
    const errors = {};
    if (!formData.name || formData.name.length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Valid email is required';
    }
    if (!formData.password || formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      await dispatch(createAdmin(formData)).unwrap();
      setSuccessMessage('Admin user created successfully!');
      setShowCreateModal(false);
      setFormData({ name: '', email: '', password: '' });
      dispatch(fetchUsers({ search: searchTerm, role: roleFilter }));
    } catch (err) {
      setFormErrors({ submit: err });
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    if (window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
      try {
        await dispatch(updateUserRole({ userId, role: newRole })).unwrap();
        setSuccessMessage('User role updated successfully!');
      } catch (err) {
        console.error('Failed to update role:', err);
      }
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete user "${userName}"? This action cannot be undone.`)) {
      try {
        await dispatch(deleteUser(userId)).unwrap();
        setSuccessMessage('User deleted successfully!');
      } catch (err) {
        console.error('Failed to delete user:', err);
      }
    }
  };

  if (loading && users.length === 0) return <Loading fullScreen />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Manage Users</h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn-primary flex items-center"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Create Admin
          </button>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-800">{successMessage}</p>
          </div>
        )}

        {error && <ErrorMessage message={error} />}

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pr-10"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-600"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            </form>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="input-field"
            >
              <option value="">All Roles</option>
              <option value="customer">Customers</option>
              <option value="admin">Admins</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                            <UserIcon className="h-6 w-6 text-primary-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.role === 'admin' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {user.role === 'admin' && <ShieldCheckIcon className="h-4 w-4 mr-1" />}
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex space-x-2">
                          <select
                            value={user.role}
                            onChange={(e) => handleRoleChange(user._id, e.target.value)}
                            className="text-sm border border-gray-300 rounded px-2 py-1"
                          >
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                          </select>
                          <button
                            onClick={() => handleDeleteUser(user._id, user.name)}
                            className="text-red-600 hover:text-red-800"
                            title="Delete user"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Statistics */}
        {pagination && (
          <div className="mt-6 text-sm text-gray-600">
            Showing {users.length} of {pagination.total} users
          </div>
        )}
      </div>

      {/* Create Admin Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Create Admin User</h2>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setFormData({ name: '', email: '', password: '' });
                  setFormErrors({});
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {formErrors.submit && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-800">{formErrors.submit}</p>
              </div>
            )}

            <form onSubmit={handleCreateAdmin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`input-field ${formErrors.name ? 'border-red-500' : ''}`}
                  placeholder="Admin Name"
                />
                {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`input-field ${formErrors.email ? 'border-red-500' : ''}`}
                  placeholder="admin@example.com"
                />
                {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`input-field ${formErrors.password ? 'border-red-500' : ''}`}
                  placeholder="Minimum 8 characters"
                />
                {formErrors.password && <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>}
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setFormData({ name: '', email: '', password: '' });
                    setFormErrors({});
                  }}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="flex-1 btn-primary">
                  Create Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
