import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { concerns } from '../data/products';

export function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', concern: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.concern) return;

    // Simulate sending to backend queue, then open WhatsApp
    const message = `Hello, I need skin advice.%0A*Name:* ${formData.name}%0A*Primary Concern:* ${formData.concern}`;
    const whatsappUrl = `https://wa.me/1234567890?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
    setFormData({ name: '', concern: '' });
  };

  return (
    <>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5, type: 'spring' }}
        className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 group"
      >
        <div className="bg-white px-4 py-2 rounded-full shadow-lg text-sm font-medium text-brand-dark opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-brand-sage/20 pointer-events-none">
          Need Skin Advice
        </div>
        
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-brand-sage text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-[#7a9a60] transition-colors relative"
        >
          <MessageCircle size={28} />
          {/* Pulsing indicator */}
          <span className="absolute top-0 right-0 w-3 h-3 bg-brand-gold rounded-full border-2 border-brand-offwhite animate-ping"></span>
          <span className="absolute top-0 right-0 w-3 h-3 bg-brand-gold rounded-full border-2 border-brand-offwhite"></span>
        </button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-brand-dark/20 backdrop-blur-sm px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-sm shadow-xl p-8 max-w-sm w-full relative"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-brand-dark/40 hover:text-brand-dark transition-colors"
              >
                <X size={20} />
              </button>
              
              <h3 className="text-xl font-heading mb-2">Need Skin Advice?</h3>
              <p className="text-xs text-brand-dark/60 mb-6 leading-relaxed">
                Fill out the quick form below, and we will connect you directly with one of our skin consultants on WhatsApp.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold tracking-widest text-brand-dark/70 uppercase mb-2">
                    Your Name
                  </label>
                  <input 
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-sage transition-colors bg-transparent text-sm"
                    placeholder="Jane Doe"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold tracking-widest text-brand-dark/70 uppercase mb-2">
                    Primary Concern
                  </label>
                  <select
                    required
                    value={formData.concern}
                    onChange={(e) => setFormData({ ...formData, concern: e.target.value })}
                    className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-sage transition-colors bg-transparent text-sm cursor-pointer outline-none"
                  >
                    <option value="" disabled>Select a priority condition</option>
                    {concerns.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#25D366] text-white py-3 rounded-sm font-medium flex items-center justify-center gap-2 hover:bg-[#1EBE5C] transition-colors mt-6 text-sm"
                >
                  <MessageCircle size={18} /> Chat on WhatsApp
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
