import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productsSlice';
import { addToCart } from '../redux/cartSlice';
import SEO from '../components/SEO';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { MagnifyingGlassIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, pagination, loading, error } = useSelector((state) => state.products);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [localSearch, setLocalSearch] = useState(searchParams.get('search') || '');
  const [localCategory, setLocalCategory] = useState(searchParams.get('category') || '');
  const [localSort, setLocalSort] = useState('-createdAt');

  useEffect(() => {
    const params = {
      page: searchParams.get('page') || 1,
      limit: 12,
      search: searchParams.get('search') || '',
      category: searchParams.get('category') || '',
      sort: localSort,
    };

    dispatch(fetchProducts(params));
  }, [dispatch, searchParams, localSort]);

  const handleSearch = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (localSearch) {
      newParams.set('search', localSearch);
    } else {
      newParams.delete('search');
    }
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const handleCategoryChange = (category) => {
    setLocalCategory(category);
    const newParams = new URLSearchParams(searchParams);
    if (category) {
      newParams.set('category', category);
    } else {
      newParams.delete('category');
    }
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const handleAddToCart = async (productId) => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }
    await dispatch(addToCart({ productId, quantity: 1 }));
  };

  const handlePageChange = (page) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', page);
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading && !products.length) return <Loading fullScreen />;
  if (error) return <ErrorMessage message={error} onRetry={() => dispatch(fetchProducts({}))} />;

  const category = searchParams.get('category');
  const seoTitle = category 
    ? `${category}'s Watches - Premium Collection | Ghariyaal`
    : 'Shop Premium Watches - Men & Women Collection | Ghariyaal';
  const seoDescription = category
    ? `Browse our exclusive collection of ${category.toLowerCase()}'s premium watches. Authentic timepieces with free shipping across Pakistan.`
    : 'Shop premium watches for men and women at Ghariyaal. Authentic timepieces, best prices, and free shipping across Pakistan.';

  return (
    <>
      <SEO 
        title={seoTitle}
        description={seoDescription}
        keywords={`${category || 'premium'} watches, authentic watches, watch collection, ${category || 'men women'} timepieces`}
        url={`/products${category ? `?category=${category}` : ''}`}
      />
      <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Our Products</h1>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="input-field pr-10"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-600"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            </form>

            {/* Category Filter */}
            <select
              value={localCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="input-field"
            >
              <option value="">All Categories</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
            </select>

            {/* Sort */}
            <select
              value={localSort}
              onChange={(e) => setLocalSort(e.target.value)}
              className="input-field"
            >
              <option value="-createdAt">Newest First</option>
              <option value="createdAt">Oldest First</option>
              <option value="price">Price: Low to High</option>
              <option value="-price">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
              <option value="-name">Name: Z to A</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No products found</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition flex flex-col h-full">
                  <Link to={`/products/${product._id}`} className="flex-shrink-0">
                    <img
                      src={product.imageUrl || 'https://via.placeholder.com/300'}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                    />
                  </Link>
                  <div className="p-4 flex flex-col flex-grow">
                    <Link to={`/products/${product._id}`}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-600 transition line-clamp-2 min-h-[3.5rem]">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">{product.description}</p>
                    <div className="mt-auto">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xl font-bold text-primary-600">
                          Rs. {product.price.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500">
                          {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                        </span>
                      </div>
                      <button
                        onClick={() => handleAddToCart(product._id)}
                        disabled={product.stock === 0}
                        className="w-full btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ShoppingCartIcon className="h-5 w-5 mr-2" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>

                  {[...Array(pagination.totalPages)].map((_, index) => {
                    const page = index + 1;
                    if (
                      page === 1 ||
                      page === pagination.totalPages ||
                      (page >= pagination.page - 2 && page <= pagination.page + 2)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-4 py-2 rounded-md ${
                            page === pagination.page
                              ? 'bg-primary-600 text-white'
                              : 'bg-white border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (
                      page === pagination.page - 3 ||
                      page === pagination.page + 3
                    ) {
                      return <span key={page} className="px-2">...</span>;
                    }
                    return null;
                  })}

                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
    </>
  );
};

export default Products;
