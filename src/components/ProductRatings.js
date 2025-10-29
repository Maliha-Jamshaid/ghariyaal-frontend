import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StarIcon } from '@heroicons/react/24/solid';
import { getProductRatings } from '../redux/ratingsSlice';

const ProductRatings = ({ productId }) => {
  const dispatch = useDispatch();
  const { productRatings, loading } = useSelector((state) => state.ratings);

  useEffect(() => {
    if (productId) {
      dispatch(getProductRatings({ productId, page: 1, limit: 10 }));
    }
  }, [dispatch, productId]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Check if there are no ratings after loading is complete
  if (!productRatings || !productRatings.ratings || productRatings.ratings.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No ratings yet. Be the first to rate this product!</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">
          Customer Reviews ({productRatings.totalRatings})
        </h3>
      </div>

      <div className="space-y-4">
        {productRatings.ratings.map((rating) => (
          <div
            key={rating._id}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <p className="font-medium text-gray-900">
                    {rating.user?.name || 'Anonymous'}
                  </p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <StarIcon
                        key={index}
                        className={`w-4 h-4 ${
                          index < rating.rating
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  {formatDate(rating.createdAt)}
                </p>
              </div>
            </div>
            {rating.review && (
              <p className="text-gray-700 text-sm leading-relaxed">
                {rating.review}
              </p>
            )}
          </div>
        ))}
      </div>

      {productRatings && productRatings.totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() =>
              dispatch(
                getProductRatings({
                  productId,
                  page: productRatings.currentPage + 1,
                  limit: 10,
                })
              )
            }
            disabled={productRatings.currentPage >= productRatings.totalPages}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Load More Reviews
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductRatings;
