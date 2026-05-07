import React from 'react';
import { motion } from 'motion/react';
import { ProductGrid } from '../components/ProductGrid';

export function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full overflow-hidden flex items-center justify-center bg-[#E5ECE3]">
        {/* Background Image / Overlay */}
        <motion.div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=2000")' }}
        >
          <div className="absolute inset-0 bg-brand-offwhite/40" />
        </motion.div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl mb-6 text-brand-dark"
          >
            Radiance, Naturally.
          </motion.h1>
          
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-brand-dark/80 max-w-2xl mx-auto mb-10 font-light"
          >
            High-performance botanical skincare designed to target your unique skin concerns. Formulated with uncompromising purity.
          </motion.p>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <button 
              onClick={() => window.scrollTo({ top: window.innerHeight * 0.85, behavior: 'smooth' })}
              className="bg-brand-dark text-brand-offwhite px-8 py-4 uppercase tracking-[0.2em] text-xs font-semibold hover:bg-brand-sage transition-colors duration-300"
            >
              Discover the Collection
            </button>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Banner */}
      <section className="py-24 px-6 bg-brand-sage text-white text-center">
        <div className="max-w-3xl mx-auto">
          <p className="font-heading text-xl md:text-3xl leading-relaxed font-light italic">
            "We believe that nature holds the ultimate blueprint for healthy skin. Every drop is intentional."
          </p>
        </div>
      </section>

      {/* Dynamic Product Catalog */}
      <ProductGrid />
    </motion.div>
  );
}
