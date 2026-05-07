import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Globe, Sun, Moon, Menu, X, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { WhatsAppButton } from './WhatsAppButton';
import { useCurrency, CurrencyCode } from '../context/CurrencyContext';

export function Layout({ children }: { children: React.ReactNode }) {
  const { itemCount } = useCart();
  const { currency, setCurrency } = useCurrency();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Apply theme class to html tag
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(t => t === 'light' ? 'dark' : 'light');
  };

  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-[#F5F5F3] font-sans text-brand-dark">
        {children}
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col pt-24 font-sans text-brand-dark dark:text-brand-offwhite bg-brand-offwhite dark:bg-brand-dark transition-colors duration-300 overflow-x-hidden ${theme}`}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-24 bg-brand-offwhite/90 dark:bg-brand-dark/90 backdrop-blur-md z-40 border-b border-brand-sage/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 -ml-2 text-brand-dark dark:text-brand-offwhite hover:text-brand-sage transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            <Link to="/" className="hover:text-brand-sage transition-colors">Shop All</Link>
            <Link to="/" className="hover:text-brand-sage transition-colors">Our Story</Link>
            <Link to="/admin/login" className="hover:text-brand-sage flex items-center gap-2 transition-colors">
              <User size={16} /> Vendor Login
            </Link>
          </nav>
          
          <Link to="/" className="text-2xl font-heading tracking-widest uppercase absolute left-1/2 -translate-x-1/2">
            N <span className="text-brand-sage italic text-xl">&</span> E
          </Link>
          
          <div className="flex items-center gap-4 md:gap-6">
            
            {/* Light/Dark Switcher */}
            <button 
              onClick={toggleTheme}
              className="text-brand-dark/70 dark:text-brand-offwhite/70 hover:text-brand-sage dark:hover:text-brand-sage transition-colors flex items-center justify-center"
              aria-label="Toggle Light/Dark Mode"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {/* Currency Switcher */}
            <div className="relative group flex items-center gap-1 text-brand-dark/70 dark:text-brand-offwhite/70 hover:text-brand-sage dark:hover:text-brand-sage transition-colors">
              <Globe size={18} />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                className="bg-transparent border-none text-xs font-medium uppercase tracking-widest outline-none cursor-pointer focus:ring-0 appearance-none pr-4"
                style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
              >
                <option value="NGN" className="text-brand-dark">NGN</option>
                <option value="USD" className="text-brand-dark">USD</option>
                <option value="GBP" className="text-brand-dark">GBP</option>
                <option value="EUR" className="text-brand-dark">EUR</option>
              </select>
              {/* Fake dropdown arrow */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-xs">▼</div>
            </div>
            
            {/* Cart */}
            <Link to="/checkout" className="flex items-center gap-2 hover:text-brand-sage transition-colors relative group text-brand-dark dark:text-brand-offwhite">
              <span className="text-sm font-medium uppercase tracking-widest hidden lg:inline-block">Cart</span>
              <ShoppingBag size={20} className="stroke-1" />
              {itemCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-2 bg-brand-sage text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold"
                >
                  {itemCount}
                </motion.span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed top-24 left-0 right-0 bg-brand-offwhite dark:bg-brand-dark border-b border-brand-sage/10 z-30 shadow-lg overflow-hidden"
          >
            <nav className="flex flex-col p-6 gap-6 text-sm font-medium tracking-widest uppercase">
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/" className="hover:text-brand-sage hover:translate-x-2 transition-all">Shop All</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/" className="hover:text-brand-sage hover:translate-x-2 transition-all">Our Story</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/admin/login" className="hover:text-brand-sage flex items-center gap-2 hover:translate-x-2 transition-all">
                <User size={16} /> Vendor Login
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-brand-dark text-brand-offwhite py-20 px-6 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-brand-offwhite/20 pb-16 mb-8">
          <div>
            <h4 className="font-heading text-xl tracking-widest mb-6">N & E ORGANIC</h4>
            <p className="text-sm text-brand-offwhite/70 max-w-sm leading-relaxed">
              Curated botanical skincare inspired by nature. We believe in simplicity, purity, and efficacy.
            </p>
          </div>
          <div>
            <h5 className="font-semibold uppercase tracking-widest text-xs text-brand-gold mb-6">Customer Care</h5>
            <ul className="space-y-4 text-sm text-brand-offwhite/70">
              <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Purity Promise</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
             <h5 className="font-semibold uppercase tracking-widest text-xs text-brand-gold mb-6">Connect</h5>
             <ul className="space-y-4 text-sm text-brand-offwhite/70">
               <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Journal</a></li>
             </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-brand-offwhite/50">
          <p>© {new Date().getFullYear()} N & E Organic Store. All rights reserved.</p>
          <p className="mt-4 md:mt-0">Crafted with botanical precision.</p>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <WhatsAppButton />
    </div>
  );
}
