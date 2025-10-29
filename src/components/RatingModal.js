import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { XMarkIcon, StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';
import { createRating, clearSubmitSuccess, clearRatingError } from '../redux/ratingsSlice';

const RatingModal = ({ isOpen, onClose, order, orderItem, product }) => {
  const dispatch = useDispatch();
  const { loading, error, submitSuccess } = useSelector((state) => state.ratings);
  
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState('');

  useEffect(() => {
    if (submitSuccess) {
      // Reset form
      setRating(0);
      setReview('');
      
      // Show success and close modal
      setTimeout(() => {
        dispatch(clearSubmitSuccess());
        onClose();
      }, 1500);
    }
  }, [submitSuccess, dispatch, onClose]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(clearRatingError());
      }, 3000);
    }
  }, [error, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }

    dispatch(
      createRating({
        orderId: order._id,
        orderItemId: orderItem._id,
        productId: product._id,
        rating,
        review: review.trim(),
      })
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        ></div>

        {/* Modal panel */}
        <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h3 className="text-xl font-semibold text-gray-900">
              Rate Your Product
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Product info */}
          <div className="px-6 py-4 bg-gray-50 border-b">
            <div className="flex items-center space-x-4">
              <img
                src={product.imageUrl || 'https://via.placeholder.com/80'}
                alt={product.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h4 className="font-medium text-gray-900">{product.name}</h4>
                <p className="text-sm text-gray-500">Order #{order._id.slice(-8)}</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 py-4">
            {/* Star rating */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Rating *
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    {star <= (hoveredRating || rating) ? (
                      <StarIcon className="w-10 h-10 text-yellow-400" />
                    ) : (
                      <StarOutlineIcon className="w-10 h-10 text-gray-300" />
                    )}
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="mt-2 text-sm text-gray-600">
                  {rating === 1 && 'Poor'}
                  {rating === 2 && 'Fair'}
                  {rating === 3 && 'Good'}
                  {rating === 4 && 'Very Good'}
                  {rating === 5 && 'Excellent'}
                </p>
              )}
            </div>

            {/* Review text */}
            <div className="mb-6">
              <label
                htmlFor="review"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Your Review (Optional)
              </label>
              <textarea
                id="review"
                rows={4}
                value={review}
                onChange={(e) => setReview(e.target.value)}
                maxLength={500}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Share your experience with this product..."
              />
              <p className="mt-1 text-xs text-gray-500 text-right">
                {review.length}/500 characters
              </p>
            </div>

            {/* Error message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Success message */}
            {submitSuccess && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-600">
                  ✓ Rating submitted successfully!
                </p>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || rating === 0}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Submit Rating'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
