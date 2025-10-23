import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { 
  ArrowRightIcon, 
  ClockIcon, 
  TruckIcon, 
  ShieldCheckIcon,
  StarIcon,
  SparklesIcon,
  GiftIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

const Home = () => {
  return (
    <>
      <SEO 
        title="Ghariyaal - Premium Watches Collection | Authentic Timepieces"
        description="Discover premium watches at Ghariyaal. Shop authentic men's and women's timepieces with free shipping across Pakistan. Best prices, 100% genuine products guaranteed."
        keywords="watches, premium watches, men's watches, women's watches, authentic watches, luxury timepieces, watch store Pakistan"
        url="/"
      />
      <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-700 to-primary-600 text-white py-24 md:py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <SparklesIcon className="h-5 w-5 mr-2 text-yellow-300" />
                <span className="text-sm font-semibold">Premium Watch Collection</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Time is
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">
                  Precious
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 text-primary-100 leading-relaxed">
                Discover luxury timepieces that define elegance and precision. 
                Your perfect watch awaits.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  to="/products" 
                  className="inline-flex items-center justify-center bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Explore Collection
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
                <Link 
                  to="/about" 
                  className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition border-2 border-white/30"
                >
                  Learn More
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-sm text-primary-200">Products</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold">1000+</div>
                  <div className="text-sm text-primary-200">Happy Customers</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold">100%</div>
                  <div className="text-sm text-primary-200">Authentic</div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative hidden lg:block">
              <div className="relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80" 
                  alt="Luxury watches" 
                  className="rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
                />
                <div className="absolute -bottom-6 -left-6 bg-yellow-400 text-gray-900 px-6 py-4 rounded-xl shadow-xl">
                  <div className="flex items-center gap-2">
                    <StarIcon className="h-6 w-6 fill-yellow-600 text-yellow-600" />
                    <div>
                      <div className="font-bold text-lg">4.9/5</div>
                      <div className="text-sm">Customer Rating</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-10 -right-10 w-72 h-72 bg-primary-400 rounded-full blur-3xl opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Collection</h2>
            <p className="text-xl text-gray-600">Find the perfect timepiece for every style</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Men's Category */}
            <Link to="/products?category=Men" className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative h-96">
                {/* Background Image */}
                <img 
                  src="https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80" 
                  alt="Men's watches" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/50 to-transparent"></div>
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-white">
                  <ClockIcon className="h-16 w-16 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-4xl font-bold mb-2">Men's Collection</h3>
                  <p className="text-lg text-blue-100 mb-4 text-center">
                    Bold & sophisticated timepieces for the modern gentleman
                  </p>
                  <div className="flex items-center text-yellow-300 font-semibold">
                    <span>Explore Now</span>
                    <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>

                {/* Badge */}
                <div className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  New Arrivals
                </div>
              </div>
            </Link>

            {/* Women's Category */}
            <Link to="/products?category=Women" className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative h-96">
                {/* Background Image */}
                <img 
                  src="https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=800&q=80" 
                  alt="Women's watches" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-pink-900/90 via-pink-900/50 to-transparent"></div>
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-white">
                  <SparklesIcon className="h-16 w-16 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-4xl font-bold mb-2">Women's Collection</h3>
                  <p className="text-lg text-pink-100 mb-4 text-center">
                    Elegant & timeless watches that complement your style
                  </p>
                  <div className="flex items-center text-yellow-300 font-semibold">
                    <span>Explore Now</span>
                    <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>

                {/* Badge */}
                <div className="absolute top-4 right-4 bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Trending
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose GHARIYAAL?</h2>
            <p className="text-xl text-gray-600">Experience excellence in every detail</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500 text-white rounded-2xl mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <ShieldCheckIcon className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">100% Authentic</h3>
              <p className="text-gray-600 leading-relaxed">
                Every timepiece comes with authenticity certificate and manufacturer warranty
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 text-white rounded-2xl mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <TruckIcon className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Free Shipping</h3>
              <p className="text-gray-600 leading-relaxed">
                Fast and reliable delivery across Pakistan with secure packaging
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-500 text-white rounded-2xl mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <StarIcon className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Premium Quality</h3>
              <p className="text-gray-600 leading-relaxed">
                Curated selection of finest watches from renowned manufacturers
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-500 text-white rounded-2xl mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <CurrencyDollarIcon className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Best Prices</h3>
              <p className="text-gray-600 leading-relaxed">
                Competitive pricing without compromising on quality or service
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Left Content */}
              <div className="p-12 flex flex-col justify-center text-white">
                <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 w-fit">
                  <GiftIcon className="h-5 w-5 mr-2" />
                  <span className="text-sm font-semibold">Limited Time Offer</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Special Discount on First Purchase
                </h2>
                
                <p className="text-xl mb-8 text-white/90">
                  Get 10% off on your first order. Use code <span className="font-bold bg-white/20 px-3 py-1 rounded">FIRST10</span> at checkout.
                </p>
                
                <Link 
                  to="/products" 
                  className="inline-flex items-center justify-center bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-fit"
                >
                  Shop Now
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
              </div>

              {/* Right Image */}
              <div className="relative h-80 lg:h-auto">
                <img 
                  src="https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&q=80" 
                  alt="Special offer" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">Don't just take our word for it</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "Excellent quality watches and amazing customer service. Received my order within 3 days!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  AK
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-gray-900">Ahmed Khan</p>
                  <p className="text-sm text-gray-600">Karachi</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "Beautiful collection! Found the perfect watch for my husband. 100% authentic as promised."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  SA
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-gray-900">Sarah Ali</p>
                  <p className="text-sm text-gray-600">Lahore</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "Best online watch store in Pakistan. Great prices and genuine products. Highly recommended!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  HM
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-gray-900">Hassan Malik</p>
                  <p className="text-sm text-gray-600">Islamabad</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-r from-primary-900 via-primary-700 to-primary-600 text-white py-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ClockIcon className="h-20 w-20 mx-auto mb-6 opacity-80" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Find Your Perfect Watch?</h2>
          <p className="text-xl md:text-2xl mb-10 text-primary-100 max-w-3xl mx-auto">
            Browse our extensive collection of premium timepieces and find the one that matches your style
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/products" 
              className="inline-flex items-center justify-center bg-white text-primary-600 px-10 py-4 rounded-lg font-semibold hover:bg-gray-100 transition shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Explore All Products
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              to="/contact" 
              className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm text-white px-10 py-4 rounded-lg font-semibold hover:bg-white/20 transition border-2 border-white/30"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Home;
