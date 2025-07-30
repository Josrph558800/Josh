import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Factory, ArrowLeft, } from 'lucide-react';
import Logo from '../components/Logo';

const RoleSelection: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <Link to="/" className="inline-flex items-center text-green-600 hover:text-green-700 mb-8">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center justify-center mb-6">
            <Logo size="lg" className="mr-4" />
            <h1 className="text-4xl font-bold text-gray-900">AgroBridge</h1>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Choose Your Role</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select your role to access features tailored specifically for your needs in the agricultural marketplace.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Farmer */}
          <Link
            to="/auth?role=farmer"
            className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-green-200"
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 p-3">
                <Logo size="md" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">I'm a Farmer</h3>
              <p className="text-gray-600 mb-6">
                List your produce, connect with buyers, and grow your farming business with direct market access.
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  List and manage products
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Connect with buyers directly
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Access farming resources
                </div>
              </div>
            </div>
          </Link>

          {/* Household */}
          <Link
            to="/auth?role=household"
            className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-orange-200"
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">I'm a Household</h3>
              <p className="text-gray-600 mb-6">
                Access fresh farm produce directly from trusted sources and enjoy hassle-free delivery to your home.
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center justify-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                  Explore daily essentials
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                  Connect with nearby farmers
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                  Fast and secure delivery
                </div>
              </div>
            </div>
          </Link>

          {/* business */}
          <Link
            to="/auth?role=business"
            className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-blue-200"
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Factory className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">I'm a Business</h3>
              <p className="text-gray-600 mb-6">
                Empower your operations by sourcing high-quality produce and raw materials directly from trusted farmers.
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Reliable sourcing network
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Transparent farmer partnerships
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Custom logistics & delivery
                </div>
              </div>
            </div>

          </Link>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500">
            Already have an account?{' '}
            <Link to="/auth" className="text-green-600 hover:text-green-700 font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;