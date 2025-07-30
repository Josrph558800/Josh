import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, MessageCircle, User, Bell } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { useCart } from '../contexts/CartContext';
import Logo from './Logo';
import { signOut } from 'firebase/auth';
import { auth } from '../pages/firebaseConfig';

const Header: React.FC = () => {
  const { user, setUser } = useUser();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

const handleLogout = async () => {
  try {
    await signOut(auth);
    setUser(null); // Clear from context
    navigate('/');
  } catch (error) {
    console.error('Logout failed:', error);
    alert('Something went wrong while logging out.');
  }
};

  if (!user) return null;

  return (
    <header className="bg-gradient-to-br from-green-50 to-orange-50 shadow-md border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to={user.role === 'farmer' ? '/farmer-dashboard' : '/marketplace'} className="flex items-center space-x-3">
            <Logo size="md" />
            <span className="text-2xl font-bold text-green-800">
              <span className="block sm:hidden">AGB</span>
              <span className="hidden sm:block">AgroBridge</span>
            </span>
          </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-600 hover:text-green-600 transition-colors">
              <Bell className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>

            <Link to="/chat" className="p-2 text-gray-600 hover:text-green-600 transition-colors">
              <MessageCircle className="h-6 w-6" />
            </Link>

            {user.role !== 'farmer' && (
              <Link to="/cart" className="relative p-2 text-gray-600 hover:text-green-600 transition-colors">
                <ShoppingCart className="h-6 w-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Link>
            )}

            <div className="relative group">
              <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <span className="hidden md:block text-sm font-medium text-gray-700">
                  {user.name}
                </span>
              </button>
              
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;