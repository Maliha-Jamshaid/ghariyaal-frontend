import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from '../redux/authSlice';
import { fetchMyOrders } from '../redux/ordersSlice';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon,
  MapPinIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  ShoppingBagIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.orders);
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'Pakistan'
    }
  });
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    dispatch(getMe());
    dispatch(fetchMyOrders());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: {
          street: user.address?.street || '',
          city: user.address?.city || '',
          state: user.address?.state || '',
          zipCode: user.address?.zipCode || '',
          country: user.address?.country || 'Pakistan'
        }
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    setUpdateError(null);
    setUpdateSuccess(false);

    try {
      const response = await api.put('/auth/update-profile', formData);
      setUpdateSuccess(true);
      setIsEditing(false);
      dispatch(getMe());
      
      setTimeout(() => {
        setUpdateSuccess(false);
      }, 3000);
    } catch (error) {
      setUpdateError(error);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setUpdateError('New passwords do not match');
      return;
    }

    setUpdateLoading(true);
    setUpdateError(null);

    try {
      await api.put('/auth/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      
      setUpdateSuccess(true);
      setShowPasswordModal(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      setTimeout(() => {
        setUpdateSuccess(false);
      }, 3000);
    } catch (error) {
      setUpdateError(error);
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading) return <Loading fullScreen />;

  const recentOrders = orders?.slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

        {updateSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-medium">Profile updated successfully!</p>
          </div>
        )}

        {updateError && (
          <ErrorMessage message={updateError} onRetry={() => setUpdateError(null)} />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-primary-600 to-primary-800 px-6 py-8 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                      <UserIcon className="h-12 w-12 text-primary-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{user?.name}</h2>
                      <p className="text-primary-100">{user?.email}</p>
                      <span className="inline-block mt-2 px-3 py-1 bg-white/20 rounded-full text-sm font-semibold">
                        {user?.role === 'admin' ? '👑 Admin' : '👤 Customer'}
                      </span>
                    </div>
                  </div>
                  
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
                    >
                      <PencilIcon className="h-5 w-5" />
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>

              <div className="p-6">
                <form onSubmit={handleSubmit}>
                  {/* Personal Information */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <div className="relative">
                          <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`input-field pl-10 ${!isEditing ? 'bg-gray-50' : ''}`}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`input-field pl-10 ${!isEditing ? 'bg-gray-50' : ''}`}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            disabled={!isEditing}
                            placeholder="+92 300 1234567"
                            className={`input-field pl-10 ${!isEditing ? 'bg-gray-50' : ''}`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Address Information */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <MapPinIcon className="h-5 w-5" />
                      Address Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Street Address
                        </label>
                        <input
                          type="text"
                          name="address.street"
                          value={formData.address.street}
                          onChange={handleChange}
                          disabled={!isEditing}
                          placeholder="123 Main Street"
                          className={`input-field ${!isEditing ? 'bg-gray-50' : ''}`}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          name="address.city"
                          value={formData.address.city}
                          onChange={handleChange}
                          disabled={!isEditing}
                          placeholder="Karachi"
                          className={`input-field ${!isEditing ? 'bg-gray-50' : ''}`}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State/Province
                        </label>
                        <input
                          type="text"
                          name="address.state"
                          value={formData.address.state}
                          onChange={handleChange}
                          disabled={!isEditing}
                          placeholder="Sindh"
                          className={`input-field ${!isEditing ? 'bg-gray-50' : ''}`}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          name="address.zipCode"
                          value={formData.address.zipCode}
                          onChange={handleChange}
                          disabled={!isEditing}
                          placeholder="75500"
                          className={`input-field ${!isEditing ? 'bg-gray-50' : ''}`}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Country
                        </label>
                        <input
                          type="text"
                          name="address.country"
                          value={formData.address.country}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className={`input-field ${!isEditing ? 'bg-gray-50' : ''}`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {isEditing && (
                    <div className="flex gap-4">
                      <button
                        type="submit"
                        disabled={updateLoading}
                        className="btn-primary flex items-center gap-2"
                      >
                        <CheckIcon className="h-5 w-5" />
                        {updateLoading ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditing(false);
                          setUpdateError(null);
                        }}
                        className="btn-secondary flex items-center gap-2"
                      >
                        <XMarkIcon className="h-5 w-5" />
                        Cancel
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Security Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Security</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Password</p>
                  <p className="text-sm text-gray-600">••••••••</p>
                </div>
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Quick Links */}
          <div className="space-y-6">
            {/* Stats Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <ShoppingBagIcon className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Total Orders</p>
                      <p className="text-2xl font-bold text-gray-900">{orders?.length || 0}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <ClockIcon className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600">Member Since</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link
                  to="/my-orders"
                  className="block p-3 rounded-lg hover:bg-gray-50 transition text-gray-700 hover:text-primary-600"
                >
                  📦 My Orders
                </Link>
                <Link
                  to="/products"
                  className="block p-3 rounded-lg hover:bg-gray-50 transition text-gray-700 hover:text-primary-600"
                >
                  🛍️ Shop Products
                </Link>
                <Link
                  to="/cart"
                  className="block p-3 rounded-lg hover:bg-gray-50 transition text-gray-700 hover:text-primary-600"
                >
                  🛒 View Cart
                </Link>
                <Link
                  to="/contact"
                  className="block p-3 rounded-lg hover:bg-gray-50 transition text-gray-700 hover:text-primary-600"
                >
                  📞 Contact Support
                </Link>
              </div>
            </div>

            {/* Recent Orders */}
            {recentOrders.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                  <Link to="/my-orders" className="text-sm text-primary-600 hover:text-primary-700">
                    View All
                  </Link>
                </div>
                <div className="space-y-3">
                  {recentOrders.map((order) => (
                    <div key={order._id} className="border-l-4 border-primary-600 pl-3 py-2">
                      <p className="text-sm font-semibold text-gray-900">
                        Order #{order._id?.slice(-8)}
                      </p>
                      <p className="text-sm text-gray-600">
                        Rs. {order.totalPrice?.toFixed(2)}
                      </p>
                      <span className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Change Password</h3>
            
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                  className="input-field"
                  required
                  minLength="8"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                  className="input-field"
                  required
                />
              </div>

              {updateError && (
                <p className="text-sm text-red-600">{updateError}</p>
              )}

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={updateLoading}
                  className="btn-primary flex-1"
                >
                  {updateLoading ? 'Updating...' : 'Update Password'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setUpdateError(null);
                    setPasswordData({
                      currentPassword: '',
                      newPassword: '',
                      confirmPassword: ''
                    });
                  }}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
