import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrders, updateOrderStatus } from '../../redux/ordersSlice';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import { EyeIcon } from '@heroicons/react/24/outline';

const AdminOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await dispatch(updateOrderStatus({ id: orderId, status: newStatus })).unwrap();
      dispatch(fetchAllOrders());
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    } catch (err) {
      console.error('Failed to update order status:', err);
    }
  };

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

  if (loading && !orders.length) return <Loading fullScreen />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Manage Orders</h1>

        {error && <ErrorMessage message={error} />}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">
                      {order._id.slice(-8)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {order.user?.name || 'N/A'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.user?.email || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                      Rs. {order.totalPrice.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold border-0 ${getStatusColor(order.status)}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleViewDetails(order)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Details Modal */}
        {isModalOpen && selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Details</h2>

                <div className="space-y-6">
                  {/* Order Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Order ID</p>
                      <p className="font-mono font-semibold">{selectedOrder._id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="font-semibold">
                        {new Date(selectedOrder.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedOrder.status)}`}>
                        {selectedOrder.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total</p>
                      <p className="font-semibold text-primary-600 text-xl">
                        Rs. {selectedOrder.totalPrice.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer</h3>
                    <p className="text-gray-700">{selectedOrder.user?.name || 'N/A'}</p>
                    <p className="text-gray-600">{selectedOrder.user?.email || 'N/A'}</p>
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Shipping Address</h3>
                    <p className="text-gray-700">
                      {selectedOrder.address.street}<br />
                      {selectedOrder.address.city}, {selectedOrder.address.state} {selectedOrder.address.zipCode}<br />
                      {selectedOrder.address.country}
                    </p>
                  </div>

                  {/* Order Items */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Order Items</h3>
                    <div className="space-y-3">
                      {selectedOrder.items.map((item) => (
                        <div key={item.product._id} className="flex items-center space-x-4 border-b pb-3">
                          <img
                            src={item.product.imageUrl || 'https://via.placeholder.com/60'}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">{item.product.name}</p>
                            <p className="text-sm text-gray-600">
                              Qty: {item.quantity} × Rs. {item.price.toLocaleString()}
                            </p>
                          </div>
                          <p className="font-semibold text-gray-900">
                            Rs. {(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Update Status */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Update Status</h3>
                    <select
                      value={selectedOrder.status}
                      onChange={(e) => handleUpdateStatus(selectedOrder._id, e.target.value)}
                      className="input-field"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="btn-secondary"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
