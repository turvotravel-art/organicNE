import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCurrency } from '../../context/CurrencyContext';
import { products } from '../../data/products';
import { motion } from 'motion/react';
import { 
  LogOut, 
  TrendingUp, 
  Users, 
  Package, 
  MessageSquare,
  FileText,
  Radio,
  RefreshCw,
  Store,
  Globe
} from 'lucide-react';

export function Dashboard() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  // Mocked data for display
  const inventorySync = products.map((p, i) => ({
    ...p,
    physicalStock: Math.floor(Math.random() * 50) + 5,
    onlineStock: Math.floor(Math.random() * 100) + 10,
  }));

  const consultationQueue = [
    { id: 1, name: 'Sarah Johnson', concern: 'Acne', time: '10 mins ago', status: 'Waiting' },
    { id: 2, name: 'Bisi Adeleke', concern: 'Hyperpigmentation', time: '1 hour ago', status: 'Waiting' },
    { id: 3, name: 'Grace Okafor', concern: 'Glow', time: '2 hours ago', status: 'Contacted' },
  ];

  const dailyRevenue = 245000; // ₦245,000

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#F5F5F3] font-sans pb-20">
      {/* Top Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="font-heading text-lg tracking-widest uppercase">
              N <span className="text-brand-sage italic">&</span> E Admin
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="text-sm font-medium text-brand-dark/60 hover:text-red-500 flex items-center gap-2 transition-colors"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 pt-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-heading mb-2">Vendor Dashboard</h1>
            <p className="text-sm text-brand-dark/60">Overview and operations for N & E Organic Store.</p>
          </div>
          
          {/* Quick Links */}
          <div className="flex flex-wrap gap-3">
            <button className="bg-white border border-gray-200 text-sm py-2 px-4 rounded-sm flex items-center gap-2 hover:border-brand-sage hover:text-brand-sage transition-all shadow-sm">
              <FileText size={16} /> Generate Receipt
            </button>
            <button className="bg-white border border-gray-200 text-sm py-2 px-4 rounded-sm flex items-center gap-2 hover:border-brand-sage hover:text-brand-sage transition-all shadow-sm">
              <Radio size={16} /> Broadcast to Customers
            </button>
            <button className="bg-white border border-gray-200 text-sm py-2 px-4 rounded-sm flex items-center gap-2 hover:border-brand-sage hover:text-brand-sage transition-all shadow-sm">
              <RefreshCw size={16} /> Update Prices
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 bg-brand-sage/10 text-brand-sage rounded-full">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-xs font-bold tracking-widest text-brand-dark/50 uppercase mb-1">Daily Revenue</p>
              <h3 className="text-2xl font-semibold">{formatPrice(dailyRevenue)}</h3>
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 bg-brand-gold/10 text-brand-gold rounded-full">
              <Users size={24} />
            </div>
            <div>
              <p className="text-xs font-bold tracking-widest text-brand-dark/50 uppercase mb-1">Pending Leads</p>
              <h3 className="text-2xl font-semibold">{consultationQueue.filter(l => l.status === 'Waiting').length}</h3>
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 bg-[#e9e6e0] text-brand-dark rounded-full">
              <Package size={24} />
            </div>
            <div>
              <p className="text-xs font-bold tracking-widest text-brand-dark/50 uppercase mb-1">Total Products</p>
              <h3 className="text-2xl font-semibold">{products.length}</h3>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Inventory Sync Table */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow-sm border border-gray-100 rounded-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-heading text-lg flex items-center gap-2">
                  <Package size={18} className="text-brand-sage" /> Inventory Sync
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#F5F5F3]/50 text-xs uppercase tracking-widest text-brand-dark/60 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4 font-medium">Product</th>
                      <th className="px-6 py-4 font-medium">Price</th>
                      <th className="px-6 py-4 font-medium">
                        <div className="flex items-center gap-1"><Store size={14} /> Shop Stock</div>
                      </th>
                      <th className="px-6 py-4 font-medium">
                        <div className="flex items-center gap-1"><Globe size={14} /> Online Stock</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {inventorySync.map(item => (
                      <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-medium flex items-center gap-3">
                          <img src={item.image} alt={item.name} className="w-8 h-8 rounded-full object-cover" />
                          <span className="truncate max-w-[200px] block" title={item.name}>{item.name}</span>
                        </td>
                        <td className="px-6 py-4 text-brand-dark/70">{formatPrice(item.price)}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center justify-center px-2 py-1 rounded text-xs font-medium ${
                            item.physicalStock < 10 ? 'bg-red-50 text-red-600' : 'bg-brand-sage/10 text-brand-sage'
                          }`}>
                            {item.physicalStock} units
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center justify-center px-2 py-1 rounded text-xs font-medium ${
                            item.onlineStock < 10 ? 'bg-red-50 text-red-600' : 'bg-brand-sage/10 text-brand-sage'
                          }`}>
                            {item.onlineStock} units
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Consultation Queue */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-sm border border-gray-100 rounded-sm overflow-hidden h-full">
              <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-heading text-lg flex items-center gap-2">
                  <MessageSquare size={18} className="text-brand-sage" /> Consultation Queue
                </h3>
              </div>
              <div className="p-0">
                {consultationQueue.map((lead, idx) => (
                  <div key={lead.id} className={`p-6 border-b border-gray-50 flex flex-col gap-3 hover:bg-gray-50 transition-colors ${idx === consultationQueue.length - 1 ? 'border-b-0' : ''}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-sm text-brand-dark">{lead.name}</h4>
                        <p className="text-xs text-brand-dark/50 mt-1">{lead.time}</p>
                      </div>
                      <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-sm font-semibold ${
                        lead.status === 'Waiting' ? 'bg-brand-gold text-white' : 'bg-green-100 text-green-700'
                      }`}>
                        {lead.status}
                      </span>
                    </div>
                    <div className="bg-[#F5F5F3] p-3 rounded-sm text-sm border-l-2 border-brand-sage">
                      <span className="font-semibold block text-xs uppercase tracking-widest text-brand-dark/50 mb-1">Selected Concern:</span>
                      {lead.concern}
                    </div>
                    {lead.status === 'Waiting' && (
                      <button className="mt-2 text-xs font-semibold uppercase tracking-widest text-brand-sage hover:text-[#6a8751] flex items-center gap-1 transition-colors">
                        Message via WhatsApp &rarr;
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
