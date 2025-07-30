import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Shield, MessageCircle, ShoppingCart, Heart, Truck, Clock, Award } from 'lucide-react';
import Header from '../components/Header';
import { useCart } from '../contexts/CartContext';

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('description');

  // Mock product data (in real app, fetch based on id)
  const product = {
    id: '1',
    name: 'Fresh Plantains',
    price: 10000,
    unit: 'bunch',
    farmer: 'Adebayo Ogundimu',
    farmerId: 'farmer1',
    location: 'Ogun State, Nigeria',
    rating: 4.7,
    reviewCount: 89,
    image: 'https://i.postimg.cc/brfcfRJY/Puerto-Rican-Plantain-Banana-Tree.jpg',
    images: [
      'https://i.postimg.cc/brfcfRJY/Puerto-Rican-Plantain-Banana-Tree.jpg',
      'https://i.postimg.cc/44pRbjLY/Green-plantains-stock-photo-Image-of-growing-climate-13006148.jpg',
      'https://i.postimg.cc/Hs2GFXCH/5ef01cd6-3eec-48a5-8c61-ffec861c0df6.jpg'
    ],
    category: 'Fruits',
    description: 'Fresh green plantains harvested straight from Ogun State farms. Ideal for boiling, frying, or roasting. Rich in fiber, potassium, and essential vitamins.',
    farmDescription: 'Green Valley Farm specializes in traditional crop cultivation using sustainable practices. Our plantains are grown without chemical inputs to preserve natural taste and quality.',
    specifications: {
      'Harvest Date': 'Within 48 hours',
      'Organic': 'Yes',
      'Pesticide-Free': 'Yes',
      'Storage': 'Store at room temperature',
      'Shelf Life': '5-7 days'
    },
    verified: true,
    inStock: true,
    availableQuantity: 70,
    farmRating: 4.9,
    deliveryTime: '1-2 days'
  };

  const reviews = [
    {
      id: 1,
      customer: 'Chioma Okoro',
      rating: 5,
      comment: 'Excellent quality Plantain! Very fresh and flavorful.',
      date: '2 days ago'
    },
    {
      id: 2,
      customer: 'Emeka Nwankwo',
      rating: 4,
      comment: 'Good quality and fast delivery. Will order again.',
      date: '1 week ago'
    },
    {
      id: 3,
      customer: 'Aisha Mohammed',
      rating: 5,
      comment: 'Best plantain I\'ve bought online. Highly recommended!',
      date: '2 weeks ago'
    }
  ];

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      unit: product.unit,
      farmer: product.farmer,
      image: product.image,
      farmerId: product.farmerId,
      quantity
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/marketplace" className="inline-flex items-center text-green-600 hover:text-green-700 mb-6">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Marketplace
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-xl border border-gray-100">
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-24 object-cover cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full mr-2">
                      {product.category}
                    </span>
                    {product.verified && (
                      <div className="flex items-center text-green-600">
                        <Shield className="h-4 w-4 mr-1" />
                        Verified
                      </div>
                    )}
                  </div>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center mr-4">
                      <Star className="h-5 w-5 text-yellow-400 mr-1" />
                      <span className="font-medium">{product.rating}</span>
                      <span className="text-gray-500 ml-1">({product.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>
                <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-red-50 transition-colors">
                  <Heart className="h-5 w-5 text-gray-600 hover:text-red-500" />
                </button>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-green-600">₦{product.price.toLocaleString()}</span>
                <span className="text-xl text-gray-600">/{product.unit}</span>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-gray-900">Farmer:</span>
                  <Link to={`/farmer/${product.farmerId}`} className="text-green-600 hover:text-green-700 font-medium">
                    {product.farmer}
                  </Link>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-gray-900">Location:</span>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {product.location}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">Farm Rating:</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="font-medium">{product.farmRating}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <Truck className="h-4 w-4 mr-2" />
                  Delivery: {product.deliveryTime}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  Fresh harvest
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Award className="h-4 w-4 mr-2" />
                  Organic certified
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity ({product.availableQuantity} {product.unit} available)
                </label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-gray-600 hover:text-gray-800"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.availableQuantity, quantity + 1))}
                      className="px-3 py-2 text-gray-600 hover:text-gray-800"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm text-gray-600">
                    Total: ₦{(product.price * quantity).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </button>
                <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Contact Farmer
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 mt-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              {['description', 'specifications', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                    selectedTab === tab
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {selectedTab === 'description' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Description</h3>
                <p className="text-gray-600 mb-6">{product.description}</p>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">About the Farm</h3>
                <p className="text-gray-600">{product.farmDescription}</p>
              </div>
            )}

            {selectedTab === 'specifications' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Specifications</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-900">{key}:</span>
                      <span className="text-gray-600">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'reviews' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Customer Reviews</h3>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 mr-1" />
                    <span className="font-medium mr-2">{product.rating}</span>
                    <span className="text-gray-500">({product.reviewCount} reviews)</span>
                  </div>
                </div>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 pb-6">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-sm font-medium text-green-600">
                              {review.customer.charAt(0)}
                            </span>
                          </div>
                          <span className="font-medium text-gray-900">{review.customer}</span>
                        </div>
                        <div className="flex items-center">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2">{review.comment}</p>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;