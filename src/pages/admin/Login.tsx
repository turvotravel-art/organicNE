import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'motion/react';
import { Lock } from 'lucide-react';

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@neorganics.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (login(email, password)) {
      navigate('/admin');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-10 shadow-lg border border-brand-sage/20 rounded-sm"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-brand-sage/10 rounded-full flex items-center justify-center mb-4 text-brand-sage">
            <Lock size={24} />
          </div>
          <h1 className="text-2xl font-heading text-center tracking-wide">
            Vendor Portal
          </h1>
          <p className="text-sm text-brand-dark/50 mt-2">N & E Organic Store</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-sm text-center">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-xs font-bold tracking-widest text-brand-dark/70 uppercase mb-2">
              Email Address
            </label>
            <input 
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-brand-sage transition-colors bg-transparent"
            />
          </div>

          <div>
            <label className="block text-xs font-bold tracking-widest text-brand-dark/70 uppercase mb-2">
              Password
            </label>
            <input 
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-brand-sage transition-colors bg-transparent"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-brand-dark text-brand-offwhite py-4 uppercase tracking-widest text-sm hover:bg-brand-sage transition-colors duration-300 shadow-md font-medium mt-4"
          >
            Access Dashboard
          </button>
        </form>
      </motion.div>
    </div>
  );
}
