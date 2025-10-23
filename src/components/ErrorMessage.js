import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center max-w-md">
        <ExclamationTriangleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Oops! Something went wrong</h3>
        <p className="text-gray-600 mb-6">{message || 'An unexpected error occurred'}</p>
        {onRetry && (
          <button onClick={onRetry} className="btn-primary">
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
