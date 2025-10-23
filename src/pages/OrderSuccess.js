import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const OrderSuccess = () => {
  const { orderId } = useParams();

  useEffect(() => {
    // Clear cart from local state if needed
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <CheckCircleIcon className="h-24 w-24 text-green-500 mx-auto mb-6" />
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Order Placed Successfully!
        </h1>
        
        <p className="text-lg text-gray-600 mb-2">
          Thank you for your order
        </p>
        
        <p className="text-gray-500 mb-8">
          Order ID: <span className="font-mono font-semibold">{orderId}</span>
        </p>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">What's Next?</h2>
          <ul className="text-left space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span>You will receive a confirmation email shortly</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span>Your order will be processed and shipped soon</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span>Track your order status in "My Orders"</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span>Payment will be collected on delivery</span>
            </li>
          </ul>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/my-orders"
            className="block w-full btn-primary text-lg"
          >
            View My Orders
          </Link>
          <Link
            to="/products"
            className="block w-full btn-secondary text-lg"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
