import React, { useState, useEffect } from 'react';
import { Plus, Package, TrendingUp, DollarSign, Eye, Edit, Trash2, Star, Box } from 'lucide-react';
import Header from '../components/Header';
import { useUser } from '../contexts/UserContext';
import { getFirestore, collection, query, where, onSnapshot, serverTimestamp, addDoc, doc, updateDoc, increment } from 'firebase/firestore';
import { getApp } from 'firebase/app';

interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  quantity: number;
  category: string;
  image: string;
  description: string;
  status: 'available' | 'sold_out' | 'pending';
}

const FarmerDashboard: React.FC = () => {
  const { user } = useUser();
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  if (!user?.id) return;

  const db = getFirestore(getApp());
  const productsRef = collection(db, 'AgroProducts');
  const q = query(productsRef, where('ownerID', '==', user.id));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const productsData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];

    setProducts(productsData);
    setLoading(false);
  }, (error) => {
    console.error('Error fetching products:', error);
    setError('Failed to load products');
    setLoading(false);
  });

  return () => unsubscribe(); // Cleanup listener on unmount
}, [user?.id]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    unit: 'kg',
    quantity: '',
    category: 'Vegetables',
    description: '',
    image: ''
  });

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.id) {
      console.error("No user logged in");
      return;
    }

    try {
      const db = getFirestore();
      const productsRef = collection(db, 'AgroProducts');
      
      const productData = {
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        unit: newProduct.unit,
        quantity: parseInt(newProduct.quantity),
        category: newProduct.category,
        description: newProduct.description,
        image: newProduct.image || 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg',
        status: 'available' as const,
        ownerID: user.id,
        ownerName: user.farmName || 'Unknown Farmer',
        location: user.location || 'Nigeria',
        verified: false,
        rating: user.rating,
        inStock: parseInt(newProduct.quantity) > 0,
        createdAt: serverTimestamp()
      };

      const userRef = doc(db, 'AgroBridge', user.id);
      await updateDoc(userRef, {
        totalProducts: increment(1)
      });

      // Add to Firestore
      const docRef = await addDoc(productsRef, productData);
      
      setProducts([...products, {
        id: docRef.id,
        ...productData
      }]);

      // Reset form
      setNewProduct({
        name: '',
        price: '',
        unit: 'kg',
        quantity: '',
        category: 'Vegetables',
        description: '',
        image: ''
      });
      
      setShowAddProduct(false);
      
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  const stats = [
    {
      label: 'Total Products',
      value: /*user?.totalProducts?.toString() || */products.length.toString(),
      icon: Package,
      color: 'bg-blue-500'
    },
    {
      label: 'Monthly Sales',
      value: user?.monthlySales ? `₦${user.monthlySales.toLocaleString()}` : '₦0.00',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      label: 'Active Orders',
      value: user?.activeOrders?.toString() || '0',
      icon: TrendingUp,
      color: 'bg-orange-500'
    },
    {
      label: 'Rating',
      value: `${user?.rating || '0.5'}/5.0`,
      icon: Star,
      color: 'bg-yellow-500'
    }
  ];
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center py-20">Loading products...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center py-20 text-red-500">{error}</div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Welcome back, {user?.name}! 👋
                </h1>
                <p className="text-green-100">
                  {user?.farmName && `${user.farmName} • `}
                  {user?.location}
                </p>
                <div className="flex items-center mt-2">
                  <Star className="h-5 w-5 text-yellow-400 mr-1" />
                  <span className="text-green-100">{user?.rating}/5.0 Rating</span>
                </div>
              </div>
              <div className="mt-6 md:mt-0">
                <button
                  onClick={() => setShowAddProduct(true)}
                  className="bg-white text-green-700 px-6 py-3 rounded-lg font-medium hover:bg-green-50 transition-colors inline-flex items-center"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add New Product
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Products Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">My Products</h2>
            <span className="text-sm text-gray-500">{products.length} products</span>
          </div>
        </div>

        <div className="p-6">
          {products.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-20">
              <Box className="mx-auto h-16 w-16 mb-4 text-gray-400" />
              <p className="text-lg font-medium">No products yet</p>
              <p className="text-sm text-gray-400">Add products to get started</p>
            </div>
          ): (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{product.name}</h3>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          product.status === 'available'
                            ? 'bg-green-100 text-green-800'
                            : product.status === 'sold_out'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {product.status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-green-600">
                        ₦{product.price.toLocaleString()}/{product.unit}
                      </span>
                      <span className="text-sm text-gray-500">
                        {product.quantity} {product.unit} available
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-green-100 text-green-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors">
                        <Eye className="h-4 w-4 inline mr-1" />
                        View
                      </button>
                      <button className="flex-1 bg-blue-100 text-blue-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
                        <Edit className="h-4 w-4 inline mr-1" />
                        Edit
                      </button>
                      <button className="bg-red-100 text-red-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      </div>

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Add New Product</h3>
            </div>
            
            <form onSubmit={handleAddProduct} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter product name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (₦)
                  </label>
                  <input
                    type="number"
                    required
                    step="1"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unit
                  </label>
                  <select
                    value={newProduct.unit}
                    onChange={(e) => setNewProduct({...newProduct, unit: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="kg">kg</option>
                    <option value="lbs">lbs</option>
                    <option value="pieces">pieces</option>
                    <option value="bunch">bunch</option>
                    <option value="bag">bag</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    required
                    value={newProduct.quantity}
                    onChange={(e) => setNewProduct({...newProduct, quantity: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Available quantity"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="All">All</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Grains">Grains</option>
                    <option value="Herbs">Herbs</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Meat">Meat</option>
                    <option value="Other">Others</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Describe your product..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL (optional)
                </label>
                <input
                  type="url"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddProduct(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerDashboard;