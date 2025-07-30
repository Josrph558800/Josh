import { auth, db } from './firebaseConfig';
import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, MapPin, Phone, User, Mail, Lock, Building } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import Logo from '../components/Logo';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useUser();
  
  const role = searchParams.get('role') as 'farmer' | 'household' | 'business' || 'household';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    location: '',
    farmName: '',
    companyName: '',
    nin: '',
    CAC: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
  if (isLogin) {
    // 🔐 Sign In
    const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
    const userId = userCredential.user.uid;

    const userDoc = await getDoc(doc(db, 'AgroBridge', userId));
    if (userDoc.exists()) {
      setUser(userDoc.data());
      navigate(role === 'farmer' ? '/farmer-dashboard' : '/marketplace');
    } else {
      alert('User data not found.');
    }

  } else {
    // 🆕 First try to create account
    const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
    const user = userCredential.user;
    const now = new Date();

    const memberSince = now.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).replace(/,/g, '');

   const userData = {
      id: user.uid,
      name: formData.name,
      email: formData.email,
      role,
      location: formData.location,
      phone: formData.phone,
      ...(role === 'farmer' && { farmName: formData.farmName }),
      ...(role === 'business' && { companyName: formData.companyName, cac: formData.CAC }),
      ...((role === 'farmer' || role === 'household') && { nin: formData.nin }),
      ...(role === 'farmer' && {
        totalProducts: 0,
        monthlySales: 0,
        activeOrders: 0,
      }),
      ...((role === 'business' || role === 'household') && {
        ordersPlaced: 0,
        favoriteFarmers: 0,
        totalSpent: 0,
      }),
      rating: 0.5,
      verified: false,
      accountType: 'freemium',
      memberShip: memberSince,
    };

    await setDoc(doc(db, 'AgroBridge', user.uid), userData);
    setUser(userData);
    navigate(role === 'farmer' ? '/farmer-dashboard' : '/marketplace');
  }

} catch (error: any) {
  if (error.code === 'auth/email-already-in-use') {
    alert('This email is already registered. Try logging in instead.');
  } else if (error.code === 'auth/user-not-found') {
    alert('Account does not exist. Please sign up.');
  } else if (error.code === 'auth/wrong-password') {
    alert('Wrong password. Try again.');
  } else {
    alert(error.message);
  }
}


};


  const getRoleConfig = () => {
    switch (role) {
      case 'farmer':
        return {
          title: 'Farmer Account',
          subtitle: 'Connect with buyers and grow your farming business',
          color: 'green',
          icon: User
        };
      case 'business':
        return {
          title: 'business Account',
          subtitle: 'Source quality raw materials from local farmers',
          color: 'blue',
          icon: Building
        };
      default:
        return {
          title: 'Household Account',
          subtitle: 'Discover fresh produce from local farmers',
          color: 'orange',
          icon: User
        };
    }
  };

  const config = getRoleConfig();
  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/role-selection" className="inline-flex items-center text-green-600 hover:text-green-700 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Choose different role
          </Link>
          
          <div className="flex items-center justify-center mb-6">
            <div className={`w-16 h-16 bg-${config.color}-600 rounded-full flex items-center justify-center mr-3 p-2`}>
              {role === 'farmer' ? (
                <Logo size="md" />
              ) : (
                <Icon className="h-8 w-8 text-white" />
              )}
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-gray-900">{config.title}</h1>
              <p className="text-sm text-gray-600">{config.subtitle}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-center mb-6">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  isLogin
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  !isLogin
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="pl-10 w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                {role === 'farmer' && (
                <>
                  {/* Farm Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Farm Name
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center">
                        <Logo size="sm" />
                      </div>
                      <input
                        type="text"
                        name="farmName"
                        value={formData.farmName}
                        onChange={handleInputChange}
                        className="pl-10 w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter your farm name"
                      />
                    </div>
                  </div>
                </>
              )}

                {(role === 'farmer' || role === 'household') && (
                  <>
                    {/* NIN KYC */}
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        National Identification Number (NIN)
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center">
                          <User className="text-gray-400 w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          name="nin"
                          value={formData.nin}
                          onChange={handleInputChange}
                          maxLength={11}
                          className="pl-10 w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Enter your 11-digit NIN"
                        />
                      </div>
                    </div>
                  </>
                )}

                {role === 'business' && (
                  <div>
                    {/* Company Name */}
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    <div className="relative mb-4">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        className="pl-10 w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter your company name"
                      />
                    </div>

                    {/* CAC Number */}
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CAC Registration Number
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="cac"
                        value={formData.CAC}
                        onChange={handleInputChange}
                        className="pl-10 w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter CAC registration number"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="pl-10 w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleInputChange}
                      className="pl-10 w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter your location (e.g., Lagos State, Nigeria)"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10 w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 pr-10 w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="pl-10 w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors font-medium"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            By continuing, you agree to our{' '}
            <a href="#" className="text-green-600 hover:text-green-700">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-green-600 hover:text-green-700">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;