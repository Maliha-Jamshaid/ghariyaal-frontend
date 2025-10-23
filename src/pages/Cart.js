import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, updateCartItem, removeFromCart, clearCart } from '../redux/cartSlice';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { TrashIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, total, loading, error } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [dispatch, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ShoppingBagIcon className="h-24 w-24 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please login to view your cart</h2>
          <Link to="/login" className="btn-primary">
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) return <Loading fullScreen />;
  if (error) return <ErrorMessage message={error} />;

  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    await dispatch(updateCartItem({ productId, quantity: newQuantity }));
  };

  const handleRemove = async (productId) => {
    if (window.confirm('Are you sure you want to remove this item?')) {
      await dispatch(removeFromCart(productId));
    }
  };

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      await dispatch(clearCart());
    }
  };

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ShoppingBagIcon className="h-24 w-24 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <Link to="/products" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Shopping Cart</h1>
          <button onClick={handleClearCart} className="text-red-600 hover:text-red-700">
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <div key={item.product._id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.product.imageUrl || 'https://via.placeholder.com/100'}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <Link
                      to={`/products/${item.product._id}`}
                      className="text-lg font-semibold text-gray-900 hover:text-primary-600"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-gray-600 mt-1">
                      Rs. {item.product.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleUpdateQuantity(item.product._id, item.quantity - 1)}
                        className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="text-lg font-semibold w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)}
                        disabled={item.quantity >= item.product.stock}
                        className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 disabled:opacity-50"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemove(item.product._id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <TrashIcon className="h-6 w-6" />
                    </button>
                  </div>
                </div>
                <div className="mt-4 text-right">
                  <p className="text-xl font-bold text-primary-600">
                    Rs. {(item.product.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">Rs. {total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">Free</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-xl font-bold">Total</span>
                    <span className="text-xl font-bold text-primary-600">
                      Rs. {total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full btn-primary text-lg mb-4"
              >
                Proceed to Checkout
              </button>

              <Link to="/products" className="block text-center text-primary-600 hover:text-primary-700">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
