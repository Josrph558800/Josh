import React from 'react';
import { Link } from 'react-router-dom';
import { Users, TrendingUp, Shield, ArrowRight, Leaf, HandHeart, Globe } from 'lucide-react';
import Logo from '../components/Logo';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <Logo size="xl" className="mr-6" />
              <h1 className="text-6xl font-bold">AgroBridge</h1>
            </div>
            <p className="text-2xl mb-4 text-green-100">
              Improving Africa's Agriculture through the power of connection
            </p>
            <p className="text-xl mb-12 text-green-200 max-w-3xl mx-auto">
              A digital marketplace that directly connects farmers with households and manufacturing companies, 
              streamlining the supply chain for fresh, affordable farm products.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/role-selection"
                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-green-700 bg-white hover:bg-green-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <button className="inline-flex items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-lg text-white hover:bg-white hover:text-green-700 transition-all duration-200">
                Learn More
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Connecting Africa's Agricultural Network
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform creates value for farmers, households, and businesss through direct connections and transparent transactions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Direct Connection</h3>
              <p className="text-gray-600">
                Connect farmers directly with households and businesss, eliminating intermediaries and ensuring fair prices for everyone.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Increased Profitability</h3>
              <p className="text-gray-600">
                Farmers access ready customers and reduce spoilage, while households get fresh produce at competitive prices.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Trust & Transparency</h3>
              <p className="text-gray-600">
                Secure transactions, verified profiles, and review systems build trust between farmers and buyers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* For Farmers */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start mb-4">
                  <Leaf className="h-12 w-12 text-green-600 mr-3" />
                  <h3 className="text-3xl font-bold text-gray-900">For Farmers</h3>
                </div>
                <p className="text-gray-600 text-lg">
                  Grow your farming business with direct market access and community support.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Increased Profitability</h4>
                    <p className="text-gray-600">Access ready customers and reduce marketing costs while minimizing produce spoilage.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Community Growth</h4>
                    <p className="text-gray-600">Connect with experienced farmers, access training, and build lasting customer relationships.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Globe className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Agri-Intelligence</h4>
                    <p className="text-gray-600">Access market insights, weather information, and data-driven farming recommendations.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Consumers */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start mb-4">
                  <HandHeart className="h-12 w-12 text-orange-600 mr-3" />
                  <h3 className="text-3xl font-bold text-gray-900">For Consumers</h3>
                </div>
                <p className="text-gray-600 text-lg">
                  Enjoy fresh, quality produce delivered directly from local farms.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Cost Savings</h4>
                    <p className="text-gray-600">Access competitive prices through direct farmer networks without middleman markups.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Quality Assurance</h4>
                    <p className="text-gray-600">Fresh produce with real-time tracking, GPS monitoring, and quality verification systems.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <HandHeart className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Convenience</h4>
                    <p className="text-gray-600">Quality farm produce delivered to your doorstep with premium subscription options.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Agriculture?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of farmers and households already using AgroBridge to create sustainable agricultural communities.
          </p>
          <Link
            to="/role-selection"
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-green-700 bg-white hover:bg-green-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Start Your Journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Logo size="md" className="mr-3" />
              <span className="text-2xl font-bold">AgroBridge</span>
            </div>
            <p className="text-gray-400 mb-6">
              Improving Africa's Agriculture through the power of connection
            </p>
            <p className="text-gray-500">
              © 2024 AgroBridge. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;