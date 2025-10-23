import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrders } from '../../redux/ordersSlice';
import { fetchProducts } from '../../redux/productsSlice';
import Loading from '../../components/Loading';
import { 
  ShoppingBagIcon, 
  CubeIcon, 
  UsersIcon,
  CurrencyDollarIcon 
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { orders, loading: ordersLoading } = useSelector((state) => state.orders);
  const { products, loading: productsLoading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchAllOrders());
    dispatch(fetchProducts({ limit: 1000 }));
  }, [dispatch]);

  if (ordersLoading || productsLoading) return <Loading fullScreen />;

  const stats = {
    totalOrders: orders.length || 0,
    totalProducts: products.length || 0,
    totalRevenue: orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0),
    pendingOrders: orders.filter(order => order.status === 'Pending').length || 0,
  };

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your e-commerce store</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
              </div>
              <ShoppingBagIcon className="h-12 w-12 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalProducts}</p>
              </div>
              <CubeIcon className="h-12 w-12 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">
                  Rs. {stats.totalRevenue.toLocaleString()}
                </p>
              </div>
              <CurrencyDollarIcon className="h-12 w-12 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Orders</p>
                <p className="text-3xl font-bold text-gray-900">{stats.pendingOrders}</p>
              </div>
              <ShoppingBagIcon className="h-12 w-12 text-red-500" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            to="/admin/products"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
          >
            <CubeIcon className="h-10 w-10 text-primary-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Manage Products</h3>
            <p className="text-gray-600">Add, edit, or remove products from your store</p>
          </Link>

          <Link
            to="/admin/orders"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
          >
            <ShoppingBagIcon className="h-10 w-10 text-primary-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Manage Orders</h3>
            <p className="text-gray-600">View and update order statuses</p>
          </Link>

          <Link
            to="/admin/users"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
          >
            <UsersIcon className="h-10 w-10 text-primary-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Manage Users</h3>
            <p className="text-gray-600">View and manage user accounts</p>
          </Link>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Orders</h2>
            <Link to="/admin/orders" className="text-primary-600 hover:text-primary-700">
              View All →
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No orders yet</p>
          ) : (
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
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">
                        {order._id.slice(-8)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {order.user?.name || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                        Rs. {order.totalPrice.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
