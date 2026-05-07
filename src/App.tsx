/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CurrencyProvider } from './context/CurrencyContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { ProductPage } from './pages/ProductPage';
import { Checkout } from './pages/Checkout';
import { Login } from './pages/admin/Login';
import { Dashboard } from './pages/admin/Dashboard';

export default function App() {
  return (
    <AuthProvider>
      <CurrencyProvider>
        <CartProvider>
          <Router>
            <Layout>
              {/* AnimatePresence for page transitions */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/checkout" element={<Checkout />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<Dashboard />} />
                <Route path="/admin/login" element={<Login />} />
              </Routes>
            </Layout>
          </Router>
        </CartProvider>
      </CurrencyProvider>
    </AuthProvider>
  );
}
