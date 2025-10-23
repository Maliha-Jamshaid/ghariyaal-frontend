import React, { useState } from 'react';
import SEO from '../components/SEO';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqCategories = [
    {
      category: 'Ordering & Payment',
      questions: [
        {
          question: 'How do I place an order?',
          answer: 'To place an order, simply browse our products, select the watch you like, choose the quantity, and click "Add to Cart". Once you\'re ready, proceed to checkout, fill in your shipping information, and confirm your order. You\'ll receive an order confirmation via email.',
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We currently accept Cash on Delivery (COD) for all orders across Pakistan. We are working on adding online payment options including credit/debit cards and mobile wallets in the near future.',
        },
        {
          question: 'Is my payment information secure?',
          answer: 'Yes, your information is completely secure. We use industry-standard encryption and security measures to protect your personal and payment information. We never store your complete card details on our servers.',
        },
        {
          question: 'Can I modify or cancel my order?',
          answer: 'You can modify or cancel your order within 2 hours of placing it. Please contact our customer support immediately at support@ghariyaal.com or call us at +92 300 1234567. Once the order is shipped, modifications are not possible.',
        },
      ],
    },
    {
      category: 'Shipping & Delivery',
      questions: [
        {
          question: 'Do you offer free shipping?',
          answer: 'Yes! We offer free shipping on all orders across Pakistan. Your order will be carefully packaged and shipped via our trusted courier partners.',
        },
        {
          question: 'How long does delivery take?',
          answer: 'Delivery typically takes 3-5 business days for major cities (Karachi, Lahore, Islamabad) and 5-7 business days for other areas. You will receive a tracking number once your order is shipped.',
        },
        {
          question: 'Can I track my order?',
          answer: 'Yes, once your order is shipped, you will receive a tracking number via email and SMS. You can use this number to track your order on our website or the courier\'s website.',
        },
        {
          question: 'What if I\'m not home during delivery?',
          answer: 'Our delivery partner will attempt delivery up to 3 times. If you\'re unavailable, they will leave a notification with instructions on how to reschedule delivery or pick up from the nearest courier office.',
        },
      ],
    },
    {
      category: 'Products & Authenticity',
      questions: [
        {
          question: 'Are all watches authentic?',
          answer: 'Absolutely! We guarantee 100% authenticity for all our watches. Every timepiece comes with a certificate of authenticity and manufacturer warranty. We only source from authorized distributors and manufacturers.',
        },
        {
          question: 'Do the watches come with warranty?',
          answer: 'Yes, all our watches come with manufacturer warranty. The warranty period varies by brand (typically 1-2 years). The warranty card will be included with your purchase.',
        },
        {
          question: 'What if the product is out of stock?',
          answer: 'If a product is out of stock, you can sign up for notifications on the product page. We\'ll email you as soon as it\'s back in stock. Alternatively, contact our customer service for information about restocking dates.',
        },
        {
          question: 'Can I request a specific watch that\'s not on your website?',
          answer: 'Yes! Please contact us with the watch model and brand you\'re looking for. We\'ll do our best to source it for you within 2-3 weeks.',
        },
      ],
    },
    {
      category: 'Returns & Exchanges',
      questions: [
        {
          question: 'What is your return policy?',
          answer: 'We offer a 7-day return policy. If you\'re not satisfied with your purchase, you can return it within 7 days of delivery for a full refund or exchange. The watch must be in original condition with all packaging and accessories.',
        },
        {
          question: 'How do I return a product?',
          answer: 'To initiate a return, contact our customer support at support@ghariyaal.com with your order number and reason for return. We\'ll provide you with return instructions and a return shipping label.',
        },
        {
          question: 'When will I receive my refund?',
          answer: 'Once we receive and inspect your returned item, your refund will be processed within 5-7 business days. The refund will be credited to your original payment method or as store credit, based on your preference.',
        },
        {
          question: 'Can I exchange a watch for a different model?',
          answer: 'Yes, you can exchange your watch for a different model within 7 days of delivery. The price difference (if any) will need to be paid or refunded accordingly.',
        },
      ],
    },
    {
      category: 'Account & Support',
      questions: [
        {
          question: 'Do I need an account to place an order?',
          answer: 'Yes, you need to create an account to place an order. This allows you to track your orders, save your preferences, and enjoy a faster checkout process for future purchases.',
        },
        {
          question: 'How do I reset my password?',
          answer: 'Click on "Login" and then select "Forgot Password". Enter your email address, and we\'ll send you a link to reset your password.',
        },
        {
          question: 'How can I contact customer support?',
          answer: 'You can reach us via email at support@ghariyaal.com, call us at +92 300 1234567, or use the contact form on our website. Our support team is available Monday-Friday, 9 AM - 8 PM, and Saturday 10 AM - 6 PM.',
        },
        {
          question: 'How do I update my account information?',
          answer: 'Log in to your account and go to "My Account" or "Profile" section. From there, you can update your personal information, shipping addresses, and preferences.',
        },
      ],
    },
    {
      category: 'Product Care',
      questions: [
        {
          question: 'How do I care for my watch?',
          answer: 'Keep your watch away from extreme temperatures and magnetic fields. Clean it regularly with a soft cloth. For water-resistant watches, ensure the crown is properly secured before water exposure. We recommend professional servicing every 3-5 years.',
        },
        {
          question: 'Are your watches water-resistant?',
          answer: 'Water resistance varies by model. Each product page specifies the water resistance rating. Please note that water resistance can diminish over time, so we recommend regular testing and servicing.',
        },
        {
          question: 'How often should I service my watch?',
          answer: 'We recommend servicing your mechanical watch every 3-5 years to ensure optimal performance. Quartz watches typically require less frequent servicing. Contact us for authorized service center information.',
        },
      ],
    },
  ];

  return (
    <>
      <SEO 
        title="FAQ - Frequently Asked Questions | Ghariyaal"
        description="Find answers to common questions about Ghariyaal's premium watches, shipping, returns, authentication, and more. Get help with your watch purchase."
        keywords="Ghariyaal FAQ, watch questions, shipping info, return policy, watch authentication, customer support"
        url="/faq"
      />
      <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions about GHARIYAAL
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-3">
                {category.category}
              </h2>

              <div className="space-y-4">
                {category.questions.map((faq, index) => {
                  const globalIndex = `${categoryIndex}-${index}`;
                  const isOpen = openIndex === globalIndex;

                  return (
                    <div key={index} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                      <button
                        onClick={() => toggleFAQ(globalIndex)}
                        className="w-full flex items-center justify-between text-left py-2 focus:outline-none group"
                      >
                        <span className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition">
                          {faq.question}
                        </span>
                        {isOpen ? (
                          <ChevronUpIcon className="h-5 w-5 text-primary-600 flex-shrink-0 ml-4" />
                        ) : (
                          <ChevronDownIcon className="h-5 w-5 text-gray-400 flex-shrink-0 ml-4" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="mt-3 pr-8">
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-12 bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg shadow-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-lg mb-6">
            Can't find the answer you're looking for? Our customer support team is here to help.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-primary-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
          >
            Contact Us
          </a>
        </div>

        {/* Quick Contact Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
            <p className="text-gray-600">support@ghariyaal.com</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
            <p className="text-gray-600">+92 300 1234567</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="font-semibold text-gray-900 mb-2">Business Hours</h3>
            <p className="text-gray-600">Mon-Fri: 9 AM - 8 PM</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default FAQ;
