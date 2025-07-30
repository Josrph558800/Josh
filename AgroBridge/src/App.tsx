// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { CartProvider } from './contexts/CartContext';
import LandingPage from './pages/LandingPage';
import RoleSelection from './pages/RoleSelection';
import AuthPage from './pages/AuthPage';
import FarmerDashboard from './pages/FarmerDashboard';
import ConsumerMarketplace from './pages/ConsumerMarketplace';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import UserProfile from './pages/UserProfile';
import ChatPage from './pages/ChatPage';
import PaymentPage from './pages/paymentPage';

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/role-selection" element={<RoleSelection />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
              <Route path="/marketplace" element={<ConsumerMarketplace />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/payment" element={<PaymentPage />} />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;