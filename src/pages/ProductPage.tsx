import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ArrowLeft, MessageCircle } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  
  const [activeAccordion, setActiveAccordion] = useState<string | null>('how-to-use');
  
  const product = products.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return <div className="py-40 text-center">Product not found.</div>;
  }

  const toggleAccordion = (section: string) => {
    setActiveAccordion(prev => prev === section ? null : section);
  };

  const handleSecureViaWhatsApp = () => {
    const priceStr = formatPrice(product.price);
    const message = `Hello N&E Organic Store! I would like to secure the following product:%0A%0A*${product.name}* (${priceStr})%0A%0APlease let me know the next steps for delivery and consultation.`;
    const whatsappUrl = `https://wa.me/1234567890?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleAddToCart = () => {
    addToCart(product);
    navigate('/checkout');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-6 py-12 md:py-24"
    >
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-sm text-brand-dark/60 hover:text-brand-sage transition-colors mb-12"
      >
        <ArrowLeft size={16} /> Back to Collection
      </button>

      <div className="flex flex-col lg:flex-row gap-16 items-start">
        {/* Product Image */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-1/2 aspect-[4/5] bg-[#e9e6e0] overflow-hidden"
        >
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Product Info */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full lg:w-1/2 lg:sticky lg:top-36"
        >
          <div className="mb-8">
            <h1 className="text-3xl md:text-5xl mb-4">{product.name}</h1>
            <p className="text-xl text-brand-sage font-medium mb-6">{formatPrice(product.price)}</p>
            <p className="text-brand-dark/80 text-lg font-light leading-relaxed mb-6">
              {product.description}
            </p>
            <p className="text-xs uppercase tracking-widest text-brand-dark/50 mb-8 block">
              {product.size}
            </p>

            <div className="bg-brand-sage/5 p-6 rounded-sm border border-brand-sage/20 mb-8">
              <h5 className="font-heading uppercase tracking-widest text-xs text-brand-gold mb-3">Why it works</h5>
              <p className="text-sm font-light text-brand-dark/80 leading-relaxed">{product.whyItWorks}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 mb-12">
            <button 
              onClick={handleSecureViaWhatsApp}
              className="w-full bg-[#25D366] text-white py-4 px-6 uppercase tracking-widest text-sm hover:bg-[#1EBE5C] transition-colors duration-300 flex items-center justify-center gap-3 shadow-lg shadow-[#25D366]/20 font-medium"
            >
              <MessageCircle size={20} />
              Secure via WhatsApp
            </button>

            <button 
              onClick={handleAddToCart}
              className="w-full bg-transparent border border-brand-dark text-brand-dark py-4 px-6 uppercase tracking-widest text-xs hover:bg-brand-dark hover:text-white transition-colors duration-300"
            >
              Add to Bag (Multiple Items)
            </button>
          </div>

          {/* Accordions */}
          <div className="border-t border-brand-dark/10">
            {/* How to Use */}
            <div className="border-b border-brand-dark/10">
              <button 
                onClick={() => toggleAccordion('how-to-use')}
                className="w-full py-6 flex items-center justify-between text-left group"
              >
                <span className="font-heading uppercase tracking-widest text-sm group-hover:text-brand-sage transition-colors">How to Use</span>
                <ChevronDown 
                  size={16} 
                  className={`transform transition-transform duration-300 ${activeAccordion === 'how-to-use' ? 'rotate-180' : ''}`} 
                />
              </button>
              <AnimatePresence>
                {activeAccordion === 'how-to-use' && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-brand-dark/70 leading-relaxed font-light text-sm">
                      {product.howToUse}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Ingredients */}
            <div className="border-b border-brand-dark/10">
              <button 
                onClick={() => toggleAccordion('ingredients')}
                className="w-full py-6 flex items-center justify-between text-left group"
              >
                <span className="font-heading uppercase tracking-widest text-sm group-hover:text-brand-sage transition-colors">Ingredients</span>
                <ChevronDown 
                  size={16} 
                  className={`transform transition-transform duration-300 ${activeAccordion === 'ingredients' ? 'rotate-180' : ''}`} 
                />
              </button>
              <AnimatePresence>
                {activeAccordion === 'ingredients' && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-brand-dark/70 leading-relaxed font-light text-sm">
                      {product.ingredients}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
