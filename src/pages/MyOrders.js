import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyOrders } from '../redux/ordersSlice';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import RatingModal from '../components/RatingModal';
import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';

const MyOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);
  const [ratingModal, setRatingModal] = useState({
    isOpen: false,
    order: null,
    orderItem: null,
    product: null,
  });

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  const openRatingModal = (order, orderItem, product) => {
    setRatingModal({
      isOpen: true,
      order,
      orderItem,
      product,
    });
  };

  const closeRatingModal = () => {
    setRatingModal({
      isOpen: false,
      order: null,
      orderItem: null,
      product: null,
    });
    // Refresh orders to get updated rating status
    dispatch(fetchMyOrders());
  };

  if (loading) return <Loading fullScreen />;
  if (error) return <ErrorMessage message={error} onRetry={() => dispatch(fetchMyOrders())} />;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-xl text-gray-600 mb-6">You haven't placed any orders yet</p>
            <Link to="/products" className="btn-primary">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b">
                  <div className="flex flex-wrap items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="text-sm text-gray-600">Order ID</p>
                        <p className="font-mono font-semibold">{order._id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Date</p>
                        <p className="font-semibold">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total</p>
                        <p className="font-semibold text-primary-600">
                          Rs. {order.totalPrice.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div>
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item._id || item.product._id} className="flex items-start space-x-4">
                        <img
                          src={item.product.imageUrl || 'https://via.placeholder.com/80'}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{item.product.name}</p>
                          <p className="text-sm text-gray-600">
                            Quantity: {item.quantity} × Rs. {item.price.toLocaleString()}
                          </p>
                          
                          {/* Rating button for delivered orders */}
                          {order.status === 'Delivered' && (
                            <div className="mt-2">
                              {item.isRated ? (
                                <div className="flex items-center text-sm text-green-600">
                                  <StarIcon className="w-4 h-4 mr-1" />
                                  <span>Rated</span>
                                </div>
                              ) : (
                                <button
                                  onClick={() =>
                                    openRatingModal(order, item, item.product)
                                  }
                                  className="flex items-center text-sm text-primary-600 hover:text-primary-700 font-medium"
                                >
                                  <StarIcon className="w-4 h-4 mr-1" />
                                  Rate this product
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                        <p className="font-semibold text-gray-900">
                          Rs. {(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Shipping Address</p>
                        <p className="text-sm text-gray-600">
                          {order.address.street}<br />
                          {order.address.city}, {order.address.state} {order.address.zipCode}<br />
                          {order.address.country}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">
                          <strong>Payment:</strong> {order.paymentMethod}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Rating Modal */}
      {ratingModal.isOpen && (
        <RatingModal
          isOpen={ratingModal.isOpen}
          onClose={closeRatingModal}
          order={ratingModal.order}
          orderItem={ratingModal.orderItem}
          product={ratingModal.product}
        />
      )}
    </div>
  );
};

export default MyOrders;
