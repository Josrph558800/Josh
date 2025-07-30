import React, { useState, useEffect } from 'react';
import { Search, MapPin, Star, ShoppingCart, Heart, Grid, List } from 'lucide-react';
import Header from '../components/Header';
import { useCart } from '../contexts/CartContext';
import { useUser } from '../contexts/UserContext';
import { Link } from 'react-router-dom';
import { collection, onSnapshot, getFirestore } from 'firebase/firestore';

interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  farmer: string;
  farmerId: string;
  location: string;
  rating: number;
  image: string;
  category: string;
  description: string;
  verified: boolean;
  inStock: boolean;
}

const ConsumerMarketplace: React.FC = () => {
  const { user } = useUser();
  const { addItem } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);

  const categories = ['All', 'Vegetables', 'Fruits', 'Grains', 'Herbs', 'Dairy', 'Meat', 'Other'];

  const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
    const db = getFirestore();
    const unsub = onSnapshot(collection(db, 'AgroProducts'), (snapshot) => {
      const productList: Product[] = snapshot.docs
        .filter(doc => doc.data().verified === true)
        .map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            price: data.price,
            unit: data.unit,
            farmer: data.ownerName || 'Unknown Farmer',
            farmerId: data.ownerID || 'unknown',
            location: data.location || 'Unknown location',
            rating: data.rating || 0.1,
            image: data.image,
            category: data.category || 'Other',
            description: data.description || '',
            verified: data.verified ?? true,
            inStock: data.quantity > 0
          };
        });

      setProducts(productList);
    }, (error) => {
      console.error('Error fetching products:', error);
    });

    return () => unsub();
  }, []);


  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
                         product.farmer.toLowerCase().includes(searchQuery.toLowerCase().trim());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const handleAddToCart = (product: Product) => {
    setLoadingProductId(product.id);
    
    setTimeout(() => {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        unit: product.unit,
        farmer: product.farmer,
        image: product.image,
        farmerId: product.farmerId
      });

      setLoadingProductId(null);
    }, 600);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for products or farmers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="price">Sort by Price</option>
                <option value="rating">Sort by Rating</option>
              </select>
              
              <div className="hidden md:flex border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 ${viewMode === 'grid' ? 'bg-green-100 text-green-600' : 'text-gray-600'}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 ${viewMode === 'list' ? 'bg-green-100 text-green-600' : 'text-gray-600'}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Fresh Products from Local Farmers</h2>
          <p className="text-gray-600">{sortedProducts.length} Products available within: {user?.location}</p>
        </div>
        
        {sortedProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6h13M9 5v6h13M5 5h.01M5 11h.01M5 17h.01" />
            </svg>
            <h2 className="text-xl font-semibold mb-2">Oops… no products found.</h2>
            <p className="text-sm">Looks like no verified products are currently listed. Check back later.</p>
          </div>
        ) : (
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
          : 'space-y-4'
        }>
          {sortedProducts.map((product) => (
            <div key={product.id} className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group ${
              viewMode === 'list' ? 'flex' : ''
            }`}>
              <div className={viewMode === 'list' ? 'w-48 flex-shrink-0' : 'relative'}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={`${viewMode === 'list' ? 'w-full h-full' : 'w-full h-48'} object-cover group-hover:scale-105 transition-transform duration-300`}
                />
                <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-colors">
                  <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                </button>
                {product.verified && (
                  <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Verified
                  </div>
                )}
              </div>
              
              <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <Link to={`/product/${product.id}`} className="text-lg font-semibold text-gray-900 hover:text-green-600 transition-colors">
                      {product.name}
                    </Link>
                    <p className="text-sm text-gray-600">{product.category}</p>
                  </div>
                  <span className="text-xl font-bold text-green-600">
                    ₦{product.price.toLocaleString()}/{product.unit}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-medium text-gray-900">{product.farmer}</p>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      {product.location}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={loadingProductId === product.id}
                    className={`flex-1 bg-green-600 text-white py-2 px-4 rounded-lg transition-colors font-medium flex items-center justify-center ${
                      loadingProductId === product.id ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
                    }`}
                  >
                    {loadingProductId === product.id ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </>
                    )}
                  </button>

                  <Link
                    to={`/product/${product.id}`}
                    className="px-4 py-2 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors font-medium text-center"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
    </div>
  );
};

export default ConsumerMarketplace;