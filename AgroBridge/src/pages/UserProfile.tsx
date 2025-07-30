import React, { useState } from 'react';
import { Camera, MapPin, Phone, Mail, Star, Package, TrendingUp, Award, Edit } from 'lucide-react';
import Header from '../components/Header';
import { useUser } from '../contexts/UserContext';
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { getApp } from "firebase/app";

const UserProfile: React.FC = () => {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    location: user?.location || '',
    farmName: user?.farmName || '',
    companyName: user?.companyName || ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({
        ...prev,
        [e.target.name]: e.target.value
      }));
    };

    const handleSave = async () => {
    try {
      const db = getFirestore(getApp());
      const userRef = doc(db, "AgroBridge", user.id);

      await updateDoc(userRef, {
        name: formData.name,
        phone: formData.phone,
        location: formData.location,
        ...(user.role === "farmer" && { farmName: formData.farmName }),
        ...(user.role === "business" && { companyName: formData.companyName })
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };


  const stats = user?.role === 'farmer'
  ? [
      {
        label: 'Total Products',
        value: user.totalProducts?.toString() || '12',
        icon: Package,
        color: 'bg-blue-500'
      },
      {
        label: 'Monthly Sales',
        value: user.monthlySales ? `₦${user.monthlySales.toLocaleString()}` : '₦0.00',
        icon: TrendingUp,
        color: 'bg-green-500'
      },
      {
        label: 'Rating',
        value: `${user.rating || '4.8'}/5.0`,
        icon: Star,
        color: 'bg-yellow-500'
      },
      {
        label: 'Member Since',
        value: user.memberShip 
          ? new Date(user.memberShip).getFullYear().toString()
          : '2023',
        icon: Award,
        color: 'bg-purple-500'
      }
    ]
  : [
      {
        label: 'Orders Placed',
        value: user.ordersPlaced?.toString() || '28',
        icon: Package,
        color: 'bg-blue-500'
      },
      {
        label: 'Total Spent',
        value: user.totalSpent ? `₦${user.totalSpent.toLocaleString()}` : '₦0.00',
        icon: TrendingUp,
        color: 'bg-green-500'
      },
      {
        label: 'Favorite Farmers',
        value: user.favoriteFarmers?.toString() || '7',
        icon: Star,
        color: 'bg-yellow-500'
      },
      {
        label: 'Member Since',
        value: user.memberShip 
          ? new Date(user.memberShip).getFullYear().toString()
          : '2023',
        icon: Award,
        color: 'bg-purple-500'
      }
    ];


  const recentActivity = user?.role === 'farmer'
    ? [
        { action: 'Added new product', item: 'Fresh Tomatoes', time: '2 hours ago' },
        { action: 'Received order', item: 'Sweet Corn - 5kg', time: '4 hours ago' },
        { action: 'Updated pricing', item: 'Organic Spinach', time: '1 day ago' },
        { action: 'Completed delivery', item: 'Fresh Carrots - 3kg', time: '2 days ago' }
      ]
    : [
        { action: 'Ordered', item: 'Fresh Tomatoes - 2kg', time: '2 hours ago' },
        { action: 'Reviewed', item: 'Sweet Bananas from Fatima Abdullahi', time: '1 day ago' },
        { action: 'Added to favorites', item: 'Green Valley Farm', time: '3 days ago' },
        { action: 'Completed purchase', item: 'Organic Spinach - 1kg', time: '1 week ago' }
      ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-gray-100 hover:bg-gray-50 transition-colors">
                  <Camera className="h-4 w-4 text-gray-600" />
                </button>
              </div>
              
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="text-2xl font-bold text-gray-900 bg-transparent border-b-2 border-green-500 focus:outline-none"
                  />
                ) : (
                  <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                )}
                
                <div className="flex items-center text-gray-600 mb-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    user.role === 'farmer' 
                      ? 'bg-green-100 text-green-800'
                      : user.role === 'business'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                  {user.verified && (
                    <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      Verified
                    </span>
                  )}
                </div>
                
                {user.farmName && (
                  <p className="text-lg text-gray-700 mb-1">{user.farmName}</p>
                )}
                
                {user.companyName && (
                  <p className="text-lg text-gray-700 mb-1">{user.companyName}</p>
                )}
                
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="bg-transparent border-b border-gray-300 focus:outline-none focus:border-green-500"
                    />
                  ) : (
                    user.location
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-6 md:mt-0">
              {isEditing ? (
                <div className="flex space-x-3">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Statistics</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div>
                      <p className="font-medium text-gray-900">
                        {activity.action} <span className="text-green-600">{activity.item}</span>
                      </p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-700">{user.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-3" />
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="bg-transparent border-b border-gray-300 focus:outline-none focus:border-green-500"
                    />
                  ) : (
                    <span className="text-gray-700">{user.phone || 'Not provided'}</span>
                  )}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-700">{user.location}</span>
                </div>
              </div>
            </div>

            {/* Rating */}
            {user.rating && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating</h3>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Star className="h-8 w-8 text-yellow-400 mr-2" />
                    <span className="text-3xl font-bold text-gray-900">{user.rating}</span>
                    <span className="text-gray-500 ml-1">/5.0</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {user.role === 'farmer' ? 'Farmer Rating' : 'Customer Rating'}
                  </p>
                </div>
              </div>
            )}

            {/* Account Status */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Verification</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.verified 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {user.verified ? 'Verified' : 'Pending'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Account Type</span>
                  <span className="text-green-600 font-medium">{user.accountType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Member Since</span>
                  <span className="text-gray-900">{user.memberShip}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;