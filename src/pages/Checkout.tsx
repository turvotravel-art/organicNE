import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export function Checkout() {
  const { items, cartTotal, clearCart } = useCart();
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    skinType: ''
  });

  const skinTypes = [
    { id: 'dry', label: 'Dry / Dehydrated' },
    { id: 'oily', label: 'Oily / Breakout Prone' },
    { id: 'combo', label: 'Combination' },
    { id: 'sensitive', label: 'Sensitive / Redness' }
  ];

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.skinType) {
      alert("Please select your skin type so we can best assist you.");
      return;
    }
    
    // Generate WhatsApp Message
    const itemsList = items.map(i => `${i.quantity}x ${i.name}`).join('%0A');
    const total = formatPrice(cartTotal);
    
    const message = `Hello N&E Organic Store! I would like to place an order.%0A%0A*Name:* ${formData.name}%0A*Skin Type:* ${formData.skinType}%0A%0A*Order:*%0A${itemsList}%0A%0A*Total:* ${total}`;
    
    const whatsappUrl = `https://wa.me/1234567890?text=${message}`;
    
    // Open WA
    window.open(whatsappUrl, '_blank');
    
    // Clear cart and redirect home
    clearCart();
    navigate('/');
  };

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-32 text-center min-h-[60vh]">
        <h2 className="text-3xl font-heading mb-6">Your bag is empty</h2>
        <button 
          onClick={() => navigate('/')} 
          className="text-brand-sage font-medium uppercase tracking-widest text-sm hover:underline"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto px-6 py-12 lg:py-20"
    >
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-sm text-brand-dark/60 hover:text-brand-sage transition-colors mb-12"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Col: Smart Forms */}
        <div className="lg:col-span-7">
          <h1 className="text-3xl md:text-5xl mb-8">Checkout</h1>
          
          <form id="checkout-form" onSubmit={handleCheckout} className="space-y-12">
            
            {/* Step 1: Skin Type (Smart Checkout Feature) */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-brand-dark p-8 border border-brand-sage/20 shadow-sm rounded-sm"
            >
              <div className="mb-6">
                <span className="text-brand-gold text-xs font-bold tracking-widest uppercase mb-2 block">Step 1</span>
                <h3 className="text-2xl font-heading">Tell us about your skin</h3>
                <p className="text-brand-dark/60 dark:text-brand-offwhite/60 text-sm mt-2">
                  We collect this data before you even say hello, allowing our consultants to provide personalized advice on your order.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skinTypes.map(type => (
                  <label 
                    key={type.id} 
                    className={`
                      cursor-pointer border p-4 rounded-sm transition-all duration-300 flex items-center justify-between
                      ${formData.skinType === type.label ? 'border-brand-sage bg-brand-sage/5 dark:bg-brand-sage/20' : 'border-gray-200 dark:border-brand-offwhite/10 hover:border-brand-sage/50'}
                    `}
                  >
                    <span className="font-medium text-sm">{type.label}</span>
                    <input 
                      type="radio" 
                      name="skinType" 
                      value={type.label}
                      checked={formData.skinType === type.label}
                      onChange={(e) => setFormData({...formData, skinType: e.target.value})}
                      className="hidden"
                    />
                    <AnimatePresence>
                      {formData.skinType === type.label && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                          <CheckCircle2 size={18} className="text-brand-sage" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </label>
                ))}
              </div>
            </motion.div>

            {/* Step 2: Details */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-brand-dark p-8 border border-brand-sage/20 shadow-sm rounded-sm"
            >
              <div className="mb-6">
                <span className="text-brand-gold text-xs font-bold tracking-widest uppercase mb-2 block">Step 2</span>
                <h3 className="text-2xl font-heading">Your Details</h3>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full border-b border-gray-300 dark:border-brand-offwhite/20 py-3 focus:outline-none focus:border-brand-sage transition-colors bg-transparent placeholder:text-gray-400"
                  placeholder="Jane Doe"
                />
              </div>
            </motion.div>

          </form>
        </div>

        {/* Right Col: Order Summary */}
        <div className="lg:col-span-5 relative">
          <div className="bg-[#E5ECE3]/50 dark:bg-brand-sage/10 p-8 sticky top-36">
            <h3 className="text-xl font-heading mb-6 border-b border-brand-sage/20 pb-4">Order Summary</h3>
            
            <div className="flex flex-col gap-6 mb-8">
              {items.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-20 bg-white dark:bg-brand-dark/50 p-1">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{item.name}</h4>
                    <p className="text-xs text-brand-dark/50 dark:text-brand-offwhite/50 mt-1">Qty: {item.quantity}</p>
                    <p className="text-sm font-medium mt-2">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-brand-sage/20 pt-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span className="text-brand-sage italic">Calculated via WhatsApp</span>
              </div>
              <div className="flex justify-between text-lg font-heading pt-4">
                <span>Total Estim.</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
            </div>

            <button 
              type="submit"
              form="checkout-form"
              className="w-full bg-brand-dark dark:bg-brand-offwhite text-brand-offwhite dark:text-brand-dark py-4 mt-8 uppercase tracking-widest text-sm hover:bg-[#1a2018] dark:hover:bg-white/90 transition-all duration-300 shadow-md flex items-center justify-center gap-2"
            >
              Order via WhatsApp
            </button>
            <p className="text-center text-xs text-brand-dark/50 dark:text-brand-offwhite/50 mt-4">
              You will be redirected to WhatsApp to confirm your personalized order.
            </p>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
