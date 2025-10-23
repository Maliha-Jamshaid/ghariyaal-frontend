import React from 'react';
import SEO from '../components/SEO';
import { 
  ClockIcon, 
  ShieldCheckIcon, 
  TruckIcon, 
  CurrencyDollarIcon,
  HeartIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const About = () => {
  const features = [
    {
      icon: ClockIcon,
      title: 'Premium Quality',
      description: 'We offer only the finest timepieces from renowned manufacturers, ensuring exceptional quality and durability.',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Authenticity Guaranteed',
      description: 'Every watch comes with a certificate of authenticity and manufacturer warranty.',
    },
    {
      icon: TruckIcon,
      title: 'Free Shipping',
      description: 'Enjoy free shipping on all orders across Pakistan with secure and insured delivery.',
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Best Prices',
      description: 'We offer competitive prices without compromising on quality or service.',
    },
  ];

  const values = [
    {
      icon: HeartIcon,
      title: 'Customer First',
      description: 'Our customers are at the heart of everything we do. Your satisfaction is our priority.',
    },
    {
      icon: SparklesIcon,
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our business, from product selection to customer service.',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Integrity',
      description: 'We conduct our business with honesty, transparency, and ethical practices.',
    },
  ];

  return (
    <>
      <SEO 
        title="About Us - Premium Watch Store in Pakistan"
        description="Learn about Ghariyaal, Pakistan's trusted destination for premium watches. We offer authentic timepieces with a commitment to quality, customer service, and excellence."
        keywords="about Ghariyaal, watch store Pakistan, authentic watches, premium timepieces"
        url="/about"
      />
      <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">About GHARIYAAL</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Your trusted destination for premium timepieces in Pakistan
          </p>
        </div>
      </div>

      {/* Our Story */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Founded in 2020, GHARIYAAL began with a simple mission: to make premium watches 
                accessible to everyone in Pakistan. What started as a small collection has grown 
                into one of the country's most trusted watch retailers.
              </p>
              <p>
                We believe that a watch is more than just a timepiece – it's a statement of style, 
                a companion for life's important moments, and an investment in quality craftsmanship. 
                That's why we carefully curate our collection to include only the finest watches 
                that meet our stringent quality standards.
              </p>
              <p>
                Today, we're proud to serve thousands of customers across Pakistan, offering an 
                extensive range of watches for men and women, backed by exceptional customer service 
                and genuine product guarantees.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600"
              alt="Luxury watches"
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose GHARIYAAL?</h2>
            <p className="text-xl text-gray-600">
              We go above and beyond to ensure your satisfaction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                  <feature.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                  <value.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Your Perfect Watch?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Explore our collection and discover timepieces that match your style
          </p>
          <a
            href="/products"
            className="inline-block bg-white text-primary-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
          >
            Browse Products
          </a>
        </div>
      </div>
    </div>
    </>
  );
};

export default About;
