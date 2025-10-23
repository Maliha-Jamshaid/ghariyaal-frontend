import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SEO from '../components/SEO';
import { fetchProductById, clearCurrentProduct } from '../redux/productsSlice';
import { addToCart } from '../redux/cartSlice';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { ShoppingCartIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentProduct: product, loading, error } = useSelector((state) => state.products);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchProductById(id));
    return () => dispatch(clearCurrentProduct());
  }, [dispatch, id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    await dispatch(addToCart({ productId: id, quantity }));
    navigate('/cart');
  };

  if (loading) return <Loading fullScreen />;
  if (error) return <ErrorMessage message={error} onRetry={() => dispatch(fetchProductById(id))} />;
  if (!product) return <ErrorMessage message="Product not found" />;

  return (
    <>
      <SEO 
        title={`${product.name} - ${product.brand || 'Premium Watch'} | Ghariyaal`}
        description={product.description || `Shop ${product.name} at Ghariyaal. Premium quality watch with authentic guarantee and fast delivery across Pakistan.`}
        keywords={`${product.name}, ${product.brand || 'watch'}, ${product.category || 'premium watch'}, buy watch online Pakistan`}
        image={product.imageUrl}
        url={`/products/${product._id}`}
        type="product"
      />
      <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-primary-600 hover:text-primary-700 mb-6"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Products
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div>
              <img
                src={product.imageUrl || 'https://via.placeholder.com/500'}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              <div className="mb-4">
                <span className="inline-block bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm">
                  {product.category}
                </span>
              </div>

              <p className="text-gray-600 mb-6">{product.description}</p>

              <div className="mb-6">
                <p className="text-4xl font-bold text-primary-600">
                  Rs. {product.price.toLocaleString()}
                </p>
              </div>

              <div className="mb-6">
                <p className="text-lg">
                  <span className="font-semibold">Availability: </span>
                  <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </span>
                </p>
              </div>

              {product.stock > 0 && (
                <>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity
                    </label>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="text-xl font-semibold">{quantity}</span>
                      <button
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="w-full btn-primary flex items-center justify-center text-lg"
                  >
                    <ShoppingCartIcon className="h-6 w-6 mr-2" />
                    Add to Cart
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProductDetails;
