import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../redux/ordersSlice';
import { fetchCart } from '../redux/cartSlice';
import { getMe } from '../redux/authSlice';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, total } = useSelector((state) => state.cart);
  const { loading, error } = useSelector((state) => state.orders);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Pakistan',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    dispatch(fetchCart());
    dispatch(getMe());
  }, [dispatch, isAuthenticated, navigate]);

  // Auto-populate form with user's saved address
  useEffect(() => {
    if (user && user.address) {
      setFormData({
        street: user.address.street || '',
        city: user.address.city || '',
        state: user.address.state || '',
        zipCode: user.address.zipCode || '',
        country: user.address.country || 'Pakistan',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const result = await dispatch(createOrder({ address: formData })).unwrap();
      navigate(`/order-success/${result._id}`);
    } catch (err) {
      console.error('Order creation failed:', err);
    }
  };

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <button onClick={() => navigate('/products')} className="btn-primary">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (loading) return <Loading fullScreen />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Checkout</h1>

        {error && <ErrorMessage message={error} />}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Shipping Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Address</h2>
            
            {user && user.address && user.address.street && (
              <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
                <p className="text-sm text-green-800">
                  ✓ Your saved address has been loaded. You can edit it if needed.
                </p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address *
                </label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="123 Main St"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="Lahore"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State/Province *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="Punjab"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="54000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country *
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <p className="text-sm text-blue-800">
                  <strong>Payment Method:</strong> Cash on Delivery
                </p>
              </div>

              <button type="submit" disabled={loading} className="w-full btn-primary text-lg">
                {loading ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cart.items.map((item) => (
                  <div key={item.product._id} className="flex items-center space-x-4">
                    <img
                      src={item.product.imageUrl || 'https://via.placeholder.com/60'}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{item.product.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-gray-900">
                      Rs. {(item.product.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">Rs. {total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">Free</span>
                </div>
                <div className="flex justify-between text-xl font-bold border-t pt-2">
                  <span>Total</span>
                  <span className="text-primary-600">Rs. {total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
