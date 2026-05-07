import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { products, concerns, Concern } from '../data/products';
import { useCurrency } from '../context/CurrencyContext';
import { Info, X } from 'lucide-react';

export function ProductGrid() {
  const [activeConcern, setActiveConcern] = useState<Concern>('All');
  const [openInfoId, setOpenInfoId] = useState<string | null>(null);
  const { formatPrice } = useCurrency();

  const filteredProducts = activeConcern === 'All'
    ? products
    : products.filter(p => p.concern.includes(activeConcern));

  const toggleInfo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setOpenInfoId(openInfoId === id ? null : id);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div>
          <h2 className="text-sm font-semibold tracking-widest uppercase text-brand-sage mb-3">
            Shop by Concern
          </h2>
          <h3 className="text-3xl md:text-4xl">Targeted botanical solutions.</h3>
        </div>
        
        {/* Benefit-First Filter */}
        <div className="flex flex-wrap gap-2">
          {concerns.map(concern => (
            <button
              key={concern}
              onClick={() => setActiveConcern(concern)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeConcern === concern
                  ? 'bg-brand-sage text-white shadow-md'
                  : 'bg-transparent border border-brand-sage/30 text-brand-dark dark:text-brand-offwhite hover:border-brand-sage'
              }`}
            >
              {concern}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        <AnimatePresence>
          {filteredProducts.map((product) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
              key={product.id}
              className="group flex flex-col relative"
            >
              <div className="relative aspect-[4/5] mb-6 overflow-hidden bg-[#e9e6e0]">
                <Link to={`/product/${product.id}`} className="block w-full h-full relative z-0">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/5 transition-colors duration-500" />
                </Link>

                {/* Why it works Toggle Button */}
                <button
                  onClick={(e) => toggleInfo(e, product.id)}
                  className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm p-3 rounded-full shadow-lg text-brand-dark hover:bg-brand-sage hover:text-white transition-all duration-300 z-10 group/btn"
                  aria-label="Why it works"
                >
                  <Info size={16} className="group-hover/btn:scale-110 transition-transform" />
                </button>

                {/* Info Overlay */}
                <AnimatePresence>
                  {openInfoId === product.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 bg-brand-sage/95 text-white p-6 flex flex-col justify-center z-20 backdrop-blur-md"
                    >
                      <button 
                        onClick={(e) => toggleInfo(e, product.id)}
                        className="absolute top-4 right-4 text-white/70 hover:text-white p-2"
                      >
                        <X size={20} />
                      </button>
                      <h5 className="font-heading tracking-widest text-sm uppercase mb-4 text-brand-gold">Why it works</h5>
                      <p className="text-sm leading-relaxed font-light">{product.whyItWorks}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <Link to={`/product/${product.id}`} className="flex-1 flex flex-col cursor-pointer">
                <h4 className="text-lg font-medium mb-1 group-hover:text-brand-sage transition-colors">
                  {product.name}
                </h4>
                <p className="text-sm text-gray-500 mb-3 line-clamp-1">{product.tagline}</p>
                <div className="mt-auto">
                  <span className="text-sm font-medium border-b border-brand-gold pb-0.5">
                    {formatPrice(product.price)}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
